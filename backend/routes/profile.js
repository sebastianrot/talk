const express = require('express')
const User = require('../models/User')
const Post = require('../models/Post')
const verify = require('./jwt-profile')
const router = express.Router();

router.get('/:username', verify, (req, res) => {
    const username = req.params.username
    
    User.find({username}, (err, user) => {
        if(err) return err
        if(user.length === 0) return res.sendStatus(404)
        console.log(user)
        Post.find({by: user[0]._id}).sort({date: -1}).lean().exec((err, post) => {
            if(err) return err
            const posts = [...post]
           
            posts.forEach((value) => {
                const likes = value.like.toString()
                if(likes.includes(req.userId)) {
                    Object.assign(value, {liked: true})
                }
            })
            console.log(posts)
            return res.json({id: user[0]._id, username: user[0].username, email: user[0].email, 
                verified: user[0].verified ,date: user[0].date, img: user[0].img, desc: user[0].desc, posts})
        })
    })
})

module.exports = router