const express = require('express')
const verify = require('./jwt-profile')
const Post = require('../models/Post')
const router = express.Router();

router.get('/:id', verify, (req, res) => {
    const id = req.params.id

    Post.find({_id: id}).populate('by').lean().then(post => {
        console.log(post)
        let liked 
        if(post.length === 0) return res.sendStatus(404)
        const likes = post[0].like.toString()
        if(likes.includes(req.userId)) liked = true
        return res.json({post: {_id: post[0]._id, text: post[0].text, like: post[0].like, img: post[0].img, liked, date: post[0].date}, user: {username: post[0].by.username, photo: post[0].by.img, verified: post[0].by.verified}})
    })
    .catch(err => {
        if(err) return res.sendStatus(404).send()
    })

})

module.exports = router