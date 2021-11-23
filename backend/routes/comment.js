const express = require('express')
const verify = require('../middlewares/jwt-verify')
const Comment = require('../models/Comment')
const Notification = require('../models/Notification')
const router = express.Router();

router.post('/:id/like', verify, async (req, res) => {
    const id = req.params.id
try {
     await Comment.updateOne({_id: id}, {$addToSet: {like: req.userId}})
     const user = await Comment.find({_id: id}).select({by: 1})
     if(user[0].by.toString() === req.userId) return res.json({like: true})
     const notificationData = new Notification({
        message: 'Twój komentarz został polubiony',
        sender: req.userId,
        receiver: user[0].by,
    })
        await notificationData.save()
        res.json({like: true})
 
}catch (err){
        res.status(500).send()
    }
})

router.post('/:id/unlike', verify, async (req, res) => {
    const id = req.params.id
try{
    await Comment.updateOne({_id: id}, {$pull: {like: req.userId}})
    res.json({like: false})
}catch(err) {
    res.status(500).send()
}
})

module.exports = router