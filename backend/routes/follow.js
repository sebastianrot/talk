const express = require('express')
const verify = require('../middlewares/jwt-verify')
const Follow = require('../models/Follow')
const Notification = require('../models/Notification')
const router = express.Router();

router.post('/:id/follow', verify, async(req, res) => {
    const id = req.params.id
try{
        const result = await Follow.find({user: id, follower: req.userId})
            if(result.length > 0) return res.json({follow: true})
            const followData= new Follow({
                user: id,
                follower: req.userId
            })
            await followData.save()

            const notificationData = new Notification({
               message: 'zaobserwował cię',
               sender: req.userId,
               receiver: id,
               ref: req.userId,
               onModel: 'User'
           })
            await notificationData.save()
            
            return res.json({follow: true})
}catch (err) {
    res.status(500).send()
}
})

router.post('/:id/unfollow', verify, async(req, res) => {
    const id = req.params.id
try{
    await Follow.deleteOne({user: id, follower: req.userId})
    return res.json({follow: false})
}catch(err) {
    res.status(500).send()
}
})

module.exports = router