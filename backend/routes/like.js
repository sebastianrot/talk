const express = require('express')
const verify = require('../middlewares/jwt-verify')
const Post = require('../models/Post')
const Notification = require('../models/Notification')
const router = express.Router();

router.post('/:id/like', verify, async (req, res) => {
    const id = req.params.id
    console.log(req.userId)
try {
     const like = await Post.updateOne({_id: id}, {$addToSet: {like: req.userId}})

     const user = await Post.find({_id: id}).select({by: 1})
     if(user[0].by.toString() === req.userId) return res.json({like: true})
     const notificationData = new Notification({
        message: 'polubił post',
        sender: req.userId,
        receiver: user[0].by,
        ref:  user[0]._id,
        onModel: 'Post'
    })
        await notificationData.save()
        console.log(like)
        res.json({like: true})
 
}catch (err){
        res.status(500).send()
    }
})



router.post('/:id/unlike', verify, async (req, res) => {
    const id = req.params.id
try{
    const unlike = await Post.updateOne({_id: id}, {$pull: {like: req.userId}})
    console.log(unlike)
    res.json({like: false})
}catch(err) {
    res.status(500).send()
}
})


module.exports = router