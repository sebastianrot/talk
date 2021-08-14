const express = require('express')
const Post = require('../models/Post')
const verify = require('../middlewares/jwt-verify')
const router = express.Router();

router.post('/', verify, (req, res) => {
    const {post} = req.body
    const postData = new Post({
        text: post,
        by: req.userId
    })

    postData.save((err)=> {
        if(err) return err
    })
})

module.exports = router