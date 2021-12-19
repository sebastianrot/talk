const express = require('express')
const verify = require('./jwt-profile')
const Post = require('../models/Post')
const isfollowing = require('../isfollowing')
const router = express.Router();

router.get('/:id/posts', verify, async(req, res) => {
    const id = req.params.id
    const page = req.query.page
    const skip = (page-1)*15
    try {
    const post = await Post.find({by: id}).populate('by', 'username img verified priv ban').skip(skip).limit(15).sort({date: -1}).lean()
    if(post.length === 0 || post[0].by.ban) return res.status(404).send()
    const followed = await isfollowing(post[0].by._id, req.userId)
    const myprofile = req.userId === post[0].by._id.toString()

    if(!post[0].by.priv || followed || myprofile) {
        const posts = [...post]
        posts.forEach((value) => {
            const likes = value.like.toString()
            if(likes.includes(req.userId)) {
                Object.assign(value, {liked: true})
            }
            value.like = value.like.length
        })
        return res.json(posts)
    }else {
        return res.status(401).send()
    }
}catch(err) {
    res.status(500).send()
}
    }) 

module.exports = router