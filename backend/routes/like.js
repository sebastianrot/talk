const express = require('express')
const verify = require('../middlewares/jwt-verify')
const User = require('../models/User')
const Post = require('../models/Post')
const router = express.Router();

router.post('/:id/like', verify, (req, res) => {
    const id = req.params.id
    const {action} = req.body
    console.log(req.userId)
    console.log(action)

    if(action === 'like') {
    Post.updateOne({_id: id}, {$addToSet: {like: req.userId}}, (err, result)=>{
        if(err) return err
        console.log(result)
        res.json({like: true})
    })
    }else if(action === 'unlike') {
        Post.updateOne({_id: id}, {$pull: {like: req.userId}}, (err, result)=> {
            if(err) return err
            console.log(result)
            res.json({like: false})
        })
    }
})

module.exports = router