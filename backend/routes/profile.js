const express = require('express')
const User = require('../models/User')
const router = express.Router();

router.get('/:username', (req, res) => {
    const username = req.params.username
    
    User.find({username}, (err, user) => {
        if(err) return err
        if(user.length === 0) return res.sendStatus(404)
        console.log(user)
        return res.json({id: user[0]._id, username: user[0].username, email: user[0].email, 
            verified: user[0].verified ,date: user[0].date, image: user[0].img, desc: user[0].desc})
    })
})

module.exports = router