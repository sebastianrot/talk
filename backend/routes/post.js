const express = require('express')
const verify = require('./jwt-profile')
const Post = require('../models/Post')
const isfollowing = require('../isfollowing')
const router = express.Router();

router.get('/:id', verify, async(req, res) => {
    const id = req.params.id
try{
        const post = await Post.find({_id: id}).populate('by').lean()
        if(post.length === 0 || post[0].by.ban) return res.sendStatus(404)
        const followed = await isfollowing(post[0].by._id, req.userId)
        const myprofile = req.userId === post[0].by._id.toString()
        if(!post[0].by.priv || followed || myprofile) {
        let liked 
        const likes = post[0].like.toString()
        if(likes.includes(req.userId)) liked = true
        return res.json({post: {_id: post[0]._id, text: post[0].text, like: post[0].like, img: post[0].img, liked, date: post[0].date}, user: {username: post[0].by.username, photo: post[0].by.img, verified: post[0].by.verified}})
        }else {
            return res.status(401).send()
        }
}catch(err) {
     return res.sendStatus(500).send()
    }

})

module.exports = router