const express = require('express')
const verify = require('../middlewares/jwt-verify')
const Join = require('../models/Join')
const Group = require('../models/Group')
const GroupPost = require('../models/GroupPost')
const Comment = require('../models/Comment')
const Feed = require('../models/Feed')
const admin = require('../middlewares/admin-verify')
const access = require('../middlewares/role-verify')
const fs = require('fs')
const router = express.Router();



router.get('/:id/accept', verify, access, async(req, res)=> {
    const id = req.params.id
    try{
        const join = await Join.find({group: id, status: 'pending'}).populate('user', 'username img verified desc').sort({date: -1})
        return res.json(join)
    }catch(err) {
        res.status(500).send()
    }
})


router.post('/:id/desc', verify, admin, async(req, res)=>{
    const id = req.params.id
    const {desc} = req.body
    try {
        if(desc.length < 150){
        await Group.updateOne({_id: id}, {desc})
            res.json({add: true})
        }
    }catch (err) {
        res.status(500).send()
    }
})

router.post('/:id/user/:user/role/:role', verify, admin, async(req, res)=>{
    const id = req.params.id
    const user = req.params.user
    const role = req.params.role
try{
    if(user !== req.userId){
    if(role === 'admin'){
        await Join.updateOne({group: id, user, status: 'accept'}, {role})
        return res.json({role: true})
    }else if(role === 'mod'){
        await Join.updateOne({group: id, user, status: 'accept'}, {role})
        return res.json({role: true})
    }else if(role === 'user'){
        await Join.updateOne({group: id, user, status: 'accept'}, {role})
        return res.json({role: true})
    }
}
    return res.status(403).send()
}catch(err){
    res.status(500).send()
}
})

router.get('/:id/block', verify, access, async(req, res)=> {
    const id = req.params.id
 try{
    const block = await Join.find({group: id, status: 'block'}).populate('user', 'username img verified desc').sort({date: -1})
    return res.json(block)
 }catch(err){
    res.status(500).send()
 }
})


router.post('/:id/user/:user/accept', verify, access, async(req, res) => {
    const id = req.params.id
    const user = req.params.user
try{
        await Join.updateOne({group: id, user}, {status: 'accept'})
        return res.json({accept: true})
}catch(err) {
    res.status(500).send()
}
})


router.post('/:id/user/:user/reject', verify, access, async(req, res) => {
    const id = req.params.id
    const user = req.params.user
    try{
        const result = await Join.find({group: id, user})
        if(result[0].role !== 'admin' && user !== req.userId) {
            await Join.deleteOne({group: id, user})
            return res.json({reject: true})
        }
        return res.status(403).send()
    }catch(err) {
        res.status(500).send()
    }
})


router.post('/:id/user/:user/block', verify, access, async(req, res) => {
    const id = req.params.id
    const user = req.params.user
try{
        const result = await Join.find({group: id, user})
        if(result[0].role !== 'admin' && user !== req.userId) {
        await Join.updateOne({group: id, user}, {status: 'block'})
        return res.json({block: true})
        }
        return res.status(403).send()
}catch(err) {
    res.status(500).send()
}
})


router.post('/:id/post/:postid/delete', verify, async(req,res)=>{
    const id = req.params.id
    const postid = req.params.postid
try{
    const result = await Join.find({user: req.userId, group: id})
    const post = await GroupPost.find({_id: postid})
    if(result[0].role === 'admin' || result[0].role === 'mod' || post[0].by.toString() === req.userId){
    await GroupPost.deleteOne({_id: postid, group: id})
    await Comment.deleteMany({post: postid})
    await Feed.deleteMany({post: postid})
    if(post[0].img.length > 0){
        post[0].img.forEach(val => {
            fs.unlinkSync(`public/posts/${val}`);
        });
    }
    return res.json({delete: true})
    }
    return res.status(403).send()
}catch(err){
    res.status(500).send()
}
})


router.post('/:id/category/:category', verify, admin, async(req, res)=>{
    const id = req.params.id
    const category = req.params.category
    const c = ['sport', 'gry', 'nauka', 'muzyka', 'tech', 'auta', 'moda', 'zwierzęta', 'sztuka', 'biznes', 'jedzenie']
try{
        if(!c.includes(category)) return res.status(404).send()
        await Group.updateOne({_id: id}, {category})
        return res.json({category: true})
}catch(err){
    res.status(500).send()
}
})


router.post('/:id/nsfw', verify, admin, async(req, res)=>{
    const id = req.params.id
    const {nsfw} = req.body
try{
    await Group.updateOne({_id: id}, {nsfw})
    return res.json({change: true})
}catch(err){
    res.status(500).send()
}
})

router.post('/:id/name', verify, admin, async(req, res)=>{
    const id = req.params.id
    const {name} = req.body
try{
    await Group.updateOne({_id: id}, {name})
    return res.json({change: true})
}catch(err){
    res.status(500).send()
}
})

router.post('/:id/priv', verify, admin, async(req, res)=>{
    const id = req.params.id
    const {priv} = req.body
try{
    await Group.updateOne({_id: id}, {priv})
    return res.json({change: true})
}catch(err){
    res.status(500).send()
}
})


module.exports = router