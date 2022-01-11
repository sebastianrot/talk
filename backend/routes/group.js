const express = require('express')
const verify = require('../middlewares/jwt-verify')
const Group = require('../models/Group')
const Join = require('../models/Join')
const GroupPost = require('../models/GroupPost')
const ingroup = require('../ingroup')
const jwt = require('./jwt-profile')
const Notification = require('../models/Notification')
const mongoose = require("mongoose");
const router = express.Router();

router.get('/:id', jwt, async(req, res) => {
    const id = req.params.id
try{
    const result = await Group.find({_id: id}).lean()
    const users = await Join.count({group: id, status: 'accept'})

    if(result.length === 0 || result[0].ban) return res.status(404).send()
    const join = await Join.find({group: id, user: req.userId}).select({status: 1, role: 1, _id: 0}).lean()
    if(join.length === 0) join.push({status: 'reject'})
    const group = {...result[0], users, ...join[0]}
    return res.json(group)
}catch (err) {
    res.status(500).send()
}
})


router.get('/:id/hashtags', jwt, async(req, res)=>{
    const id = req.params.id
try{
    const result = await Group.find({_id: id})
    const status = await ingroup(id, req.userId)
    if(result[0].priv && status !== 'accept') return res.status(401).send()
    const top = await GroupPost.aggregate([
        {$match: {group: new mongoose.Types.ObjectId(id)}},
        {$project:{words:'$hashtag'}},
        {$unwind: {path: '$words'}},
        {$group: {_id: '$words', count: {$sum: 1}}},
        {$sort: {count: -1}},
        {$limit: 6}
      ])
        res.json(top)
}catch(err){
    res.status(500).send()
}
})

router.get('/:id/search', jwt, async(req, res)=>{
    const id = req.params.id
    const query = req.query
    const page = req.query.page
    const skip = (page-1)*15
 try{
    const result = await GroupPost.find({group: id, hashtag: {$in: query.q}}).populate('by', 'username img verified').populate('group', 'name priv').skip(skip).limit(15).sort({date: -1}).lean()
    if(result.length === 0) return res.status(404).send()
    const status = await ingroup(id, req.userId)
    if(result[0].group.priv && status !== 'accept') return res.status(401).send()
    const posts = [...result]
    posts.forEach((value) => {
        const likes = value.like.toString()
        if(likes.includes(req.userId)) {
            Object.assign(value, {liked: true})
        }
        value.like = value.like.length
    })
    res.json(result)
 }catch(err){
    res.status(500).send()
 }
})

router.get('/:id/posts', jwt, async(req, res)=> {
    const id = req.params.id
    const page = req.query.page
    const skip = (page-1)*15
try{
    const result = await GroupPost.find({group: id}).populate('by', 'username img verified').populate('group', 'name priv').skip(skip).limit(15).sort({date: -1}).lean()
    if(result.length === 0) return res.status(404).send()
    const status = await ingroup(id, req.userId)
    if(!result[0].group.priv || status === 'accept') {
        const posts = [...result]
        posts.forEach((value) => {
            const likes = value.like.toString()
            if(likes.includes(req.userId)) {
                Object.assign(value, {liked: true})
            }
            value.like = value.like.length
        })
        return res.json(posts)
    }
    return res.status(401).send()
}catch(err){
    res.status(500).send()
}
})

router.get('/:id/post/:postid', jwt, async(req, res)=> {
    const id = req.params.id
    const postid = req.params.postid
try{
    const result = await GroupPost.find({_id: postid ,group: id}).populate('by', 'username img verified').populate('group', 'name priv').lean()
    if(result.length === 0) return res.status(404).send()
  
    const status = await ingroup(id, req.userId)
    if(!result[0].group.priv || status === 'accept') {
        const likes = result[0].like.toString()
        if(likes.includes(req.userId)) Object.assign(result[0], {liked: true})
        result[0].like = result[0].like.length
        return res.json(result)
    }
    return res.status(401).send()
}catch(err){
    res.status(500).send()
}
})

router.get('/:id/members', verify, async(req, res)=> {
    const id = req.params.id
    const page = req.query.page
    const skip = (page-1)*15
 try{
    const result = await Join.find({group: id, status: 'accept'}).populate('user', 'username img verified desc').skip(skip).limit(15)
    return res.json(result)
 }catch(err) {
    res.status(500).send()
}
})


router.post('/create', verify, async(req, res) => {
    const c = ['sport', 'gry', 'nauka', 'muzyka', 'tech', 'auta', 'moda', 'zwierzęta', 'sztuka', 'biznes', 'jedzenie']
    const data = req.body
    if(req.body.hide && !req.body.priv) req.body.hide=false
    const groupData= new Group(data)
try {
        if(!c.includes(data.category)) return res.json({error: true})
        if(data.name.length >= 2 && data.name.length < 25 && data.desc.length < 150){
        const save = await groupData.save()
        const joinData = new Join({user: req.userId, group: save._id, status: 'accept', role: 'admin'})
        await joinData.save()
        return res.json({add: true})
        }
        return res.json({error: true})
}catch (err) {
    res.status(500).send()
}
})


router.post('/:id/join', verify, async(req, res)=> {
    const id = req.params.id
    try{
        const result = await Join.find({user: req.userId, group: id})
        if(result.length > 0) return res.json({join: true})
      const group = await Group.findById(id)
      const status = group.priv ? 'pending' : 'accept'
      const joinData = new Join({user: req.userId, group: id, status})
      await joinData.save()

        const admin = await Join.find({group: id, $or: [{role: 'admin'}, {role: 'mod'}]}).lean()
        const notificationData = admin.map(val=>({
        message: 'dołączył do grupy',
        sender: req.userId,
        receiver: val.user,
        ref: val.group,
        onModel: 'Group'}))
        await Notification.insertMany(notificationData)
      return res.json({join: status})
    }catch(err) {
        res.status(500).send()
    }
})


router.post('/:id/leave', verify, async(req,res) => {
    const id = req.params.id
    try{
        await Join.deleteOne({group: id, user: req.userId, status: 'accept'})
        return res.json({leave: true})
    }catch(err){
        res.status(500).send()
    }
})


router.post('/:group/post/:id/like', verify, async (req, res) => {
    const id = req.params.id
    const group = req.params.group
try {
    await GroupPost.updateOne({_id: id}, {$addToSet: {like: req.userId}})

     const user = await GroupPost.find({_id: id}).select({by: 1})
     if(user[0].by.toString() === req.userId) return res.json({like: true})
     const notificationData = new Notification({
        message: 'polubił post',
        sender: req.userId,
        receiver: user[0].by,
        ref: user[0]._id,
        onModel: 'GroupPost'
    })
        await notificationData.save()
        res.json({like: true})
}catch (err){
        res.status(500).send()
    }
})



router.post('/:group/post/:id/unlike', verify, async (req, res) => {
    const id = req.params.id
try{
   await GroupPost.updateOne({_id: id}, {$pull: {like: req.userId}})
    res.json({like: false})
}catch(err) {
    res.status(500).send()
}
})


module.exports = router