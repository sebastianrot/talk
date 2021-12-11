const express = require('express')
const User = require('../models/User')
const Follow = require('../models/Follow')
const Join = require('../models/Join')
const verify = require('./jwt-profile')
const isfollowing = require('../isfollowing')
const router = express.Router();

router.get('/:username', verify, async(req, res) => {
    let username = req.params.username
    username = username.toLowerCase()
try{
        const user = await User.find({username}).select({password: 0}).lean()
        if(user.length === 0 || user[0].ban) return res.sendStatus(404)
        console.log(user)
        const followed = await isfollowing(user[0]._id, req.userId)
        const followers = await Follow.count({user: user[0]._id})
        const follow = await Follow.count({follower: user[0]._id})
        const result = {...user[0], followers, follow, followed}
            return res.json(result)
    }catch (err){
        res.status(500).send()
    }
})

router.get('/:id/groups', verify, async(req, res) => {
    let id = req.params.id
try{
    const group = await Join.find({user: id, status: 'accept'}).populate('group').sort({date: -1})
    return res.json(group)
}catch(err){
    res.status(500).send()
}
})

router.get('/:id/follow', verify, async(req, res) => {
    let id = req.params.id
try{
    const follows = await Follow.find({follower: id}).populate('user', 'username img desc verified date priv').sort({date: -1})
    return res.json(follows)
}catch(err){
    res.status(500).send()
}
})

module.exports = router