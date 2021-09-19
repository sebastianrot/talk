const express = require('express')
const verify = require('../middlewares/jwt-verify')
const User = require('../models/User')
const router = express.Router();

router.get('/', verify, async(req, res) => {
try{
    const user = await User.find({_id: req.userId})
        return res.json({id: user[0]._id, username: user[0].username})
}catch (err) {
    res.status(500).send()
}})

module.exports = router;