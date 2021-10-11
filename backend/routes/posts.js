const express = require('express')
const verify = require('./jwt-profile')
const Post = require('../models/Post')
const isfollowing = require('../isfollowing')
const router = express.Router();

router.get('/:id/posts', verify, async(req, res) => {
    const id = req.params.id
    try {
    const post = await Post.find({by: id}).populate('by').sort({date: -1}).lean()
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
        })
        console.log(post)
        return res.json({post: posts, user: {username: post[0].by.username, photo: post[0].by.img, verified: post[0].by.verified, priv: post[0].by.priv, followed}})
    }else {
        return res.status(401).send()
    }
}catch(err) {
    res.status(500).send()
}
    }) 

module.exports = router