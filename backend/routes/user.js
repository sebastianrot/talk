const express = require('express')
const User = require('../models/User')
const Follow = require('../models/Follow')
const verify = require('./jwt-profile')
const isfollowing = require('../isfollowing')
const router = express.Router();

router.get('/:username', verify, async(req, res) => {
    const username = req.params.username
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
        console.log(err)
        res.status(500).send()
    }
})

module.exports = router