const express = require('express')
const verify = require('../middlewares/jwt-verify')
const User = require('../models/User')
const router = express.Router();

router.post('/', verify, (req, res) => {
    const {desc} = req.body
    User.updateOne({_id: req.userId}, {desc}, (err) => {
        if(err) return err
        res.json({add: true})
    })
})

module.exports = router