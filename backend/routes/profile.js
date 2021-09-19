const express = require('express')
const User = require('../models/User')
const verify = require('./jwt-profile')
const isfollowing = require('../isfollowing')
const router = express.Router();

router.get('/:username', verify, async(req, res) => {
    const username = req.params.username
try{
        const user = await User.find({username})
        if(user.length === 0) return res.sendStatus(404)
        console.log(user)
        const followed = await isfollowing(user[0]._id, req.userId)

            return res.json({user: {id: user[0]._id, username: user[0].username, email: user[0].email, 
                verified: user[0].verified ,date: user[0].date, photo: user[0].img, desc: user[0].desc, followed}})
    }catch (err){
        res.status(500).send()
    }
})

module.exports = router