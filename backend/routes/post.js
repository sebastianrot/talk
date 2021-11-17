const express = require('express')
const verify = require('./jwt-profile')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const isfollowing = require('../isfollowing')
const fs = require('fs')
const router = express.Router();

router.get('/:id', verify, async(req, res) => {
    const id = req.params.id
try{
        const post = await Post.find({_id: id}).populate('by', 'username img verified priv ban').lean()
        if(post.length === 0 || post[0].by.ban) return res.sendStatus(404)
        const followed = await isfollowing(post[0].by._id, req.userId)
        const myprofile = req.userId === post[0].by._id.toString()
        if(!post[0].by.priv || followed || myprofile) {
        const likes = post[0].like.toString()
        if(likes.includes(req.userId)) Object.assign(post[0], {liked: true})
        post[0].like = post[0].like.length
        return res.json(post)
        }else {
            return res.status(401).send()
        }
}catch(err) {
     return res.sendStatus(500).send()
    }

})


router.post('/:id/delete', verify, async(req, res)=>{
    const id = req.params.id
    try{
        const result = await Post.find({_id: id})
        if(result[0].by.toString() !== req.userId) return res.status(403).send()
        await Post.deleteOne({_id: id})
        await Comment.deleteMany({post: id})
        if(result[0].img.length > 0){
            result[0].img.forEach(val => {
                fs.unlinkSync(`public/posts/${val}`);
            });
        }
        return res.json({delete: true})
    }catch(err){
        res.sendStatus(500).send()
    }
})

module.exports = router