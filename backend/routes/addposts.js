const express = require('express')
const Post = require('../models/Post')
const GroupPost = require('../models/GroupPost')
const Join = require('../models/Join')
const Follow = require('../models/Follow')
const Feed = require('../models/Feed')
const verify = require('../middlewares/jwt-verify')
const ingroup = require('../ingroup')
const multer = require('multer')
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/posts')
    },
    filename: (req, file, cb) => {
        const parts = file.mimetype.split('/')
        let r = (Math.random() + 1).toString(36).substring(7);
        cb(null, `${file.fieldname}-${Date.now()}-${r}.${parts[1]}`)
    }
})

const upload = multer({
    storage: storage, 
    limits: {fileSize: 2500000},
    fileFilter: (req, file, cb) => {
        if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            return cb(new Error('Plik nie jest obrazkiem'))
        }
        cb(null, true)
    }
})


router.post('/post', verify, upload.array('images', 4), async(req, res) => {
    const {text} = req.body
    const files = req.files
    const filesArray = []

    files.forEach(value => {
        filesArray.push(value.filename)
    })

    const postData = new Post({
        text: text,
        img: filesArray,
        by: req.userId
    })
    
try{
    const length = text.split(" ").join("").length
    if(text.length < 10000 && (length > 0 || files.length > 0)){
    const add = await postData.save()
    await add.populate('by', 'username img verified')
    const followers = await Follow.find({user: req.userId}).lean()

    const feedData = followers.map(val=>({
        user: req.userId,
        receiver: val.follower,
        post: add._id,
        onModel: 'Post'}))
        await Feed.insertMany(feedData)
    res.json(add)
    }
}catch (err) {
    res.status(500).send()
}
})



async function ismember(req, res, next) {
const group = req.params.id
try{
    const result = await Join.find({user: req.userId, group, status: 'accept'})
    if(result.length === 0) return res.status(401).send()
    return next()
}catch(err){
    res.status(500).send()
}   
}

router.post('/group/:id/post', verify, ismember, upload.array('images', 4), async(req,res)=>{
    const id = req.params.id
    const {text} = req.body
    const files = req.files
    const filesArray = []

    files.forEach(value => {
        filesArray.push(value.filename)
    })

    try{
        if(text.length < 10000 && (text.length > 0 || files.length > 0)){
        const status = await ingroup(id, req.userId)
        if(status === 'accept') {
        let change = text.match(/#[\p{L}]+/ugi)
        let hashtag = [...new Set(change)]
        hashtag = hashtag===null?[]:hashtag
        const postData = new GroupPost({text: text, group: id, by: req.userId, img: filesArray, hashtag})
        const add = await postData.save()
        await add.populate('by', 'username img verified')
        await add.populate('group')
        const joins = await Join.find({group: id, status: 'accept'}).lean()

        const feedData = joins.filter(el=>{
            if(el.user.toString()===req.userId) return false
            return true
        }).map(val=>({
            user: req.userId,
            receiver: val.user,
            post: add._id,
            group: id,
            onModel: 'GroupPost'}))
            await Feed.insertMany(feedData)
        res.json(add)
    }
   }
    return res.status(401).send()
    }catch(err){
        res.status(500).send()
    }
})

module.exports = router