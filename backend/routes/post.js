const express = require('express')
const Post = require('../models/Post')
const router = express.Router();

router.get('/:id', (req, res) => {
    const id = req.params.id

    Post.find({_id: id}).populate('by').then(post => {
        console.log(post[0].by.username)
        console.log(id)
        console.log(post)
        if(post.length === 0) return res.sendStatus(404)
        return res.json({_id: post[0]._id, text: post[0].text, like: post[0].like, date: post[0].date, username: post[0].by.username, img: post[0].by.img, verified: post[0].by.verified})
    })
    .catch(err => {
        if(err) return res.sendStatus(404)
    })

})

module.exports = router