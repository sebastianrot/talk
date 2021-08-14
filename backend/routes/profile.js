const express = require('express')
const User = require('../models/User')
const Post = require('../models/Post')
const router = express.Router();

router.get('/:username', (req, res) => {
    const username = req.params.username
    
    User.find({username}, (err, user) => {
        if(err) return err
        if(user.length === 0) return res.sendStatus(404)
        console.log(user)
        Post.find({by: user[0]._id}, (err, post) => {
            const posts = post.map((value) => value.text)
            console.log(posts)
            return res.json({id: user[0]._id, username: user[0].username, email: user[0].email, 
                verified: user[0].verified ,date: user[0].date, image: user[0].img, desc: user[0].desc, text: posts})
        })
    })
})

module.exports = router