const express = require('express')
const Notification = require('../models/Notification')
const verify = require('../middlewares/jwt-verify')
const router = express.Router();

router.get('/', verify, async(req, res) => {
try{
        const user = await Notification.find({receiver: req.userId}).populate('sender', 'username img verified').populate('ref', 'username group').sort({read: false, date: -1}).lean()
        if(user.length === 0) return res.sendStatus(404)
        res.json(user)
    }catch (err){
        res.status(500).send()
    }
})

router.post('/read', verify, async(req, res)=>{
try{
    await Notification.updateMany({receiver: req.userId}, {read: true})
    res.json({read: true})
}catch (err){
    res.status(500).send()
}
})

router.get('/count', verify, async(req, res)=>{
try{
   const notification = await Notification.count({receiver: req.userId, read: false})
   res.json(notification)
}catch (err){
    res.status(500).send()
}
})

module.exports = router