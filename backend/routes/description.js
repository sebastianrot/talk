const express = require('express')
const verify = require('../middlewares/jwt-verify')
const User = require('../models/User')
const router = express.Router();

router.post('/', verify, async(req, res) => {
    const {desc} = req.body
try {
    await User.updateOne({_id: req.userId}, {desc})
        res.json({add: true})
}catch (err) {
    res.status(500).send()
}
})

module.exports = router