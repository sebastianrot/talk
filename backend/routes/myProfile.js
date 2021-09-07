const express = require('express')
const verify = require('../middlewares/jwt-verify')
const User = require('../models/User')
const router = express.Router();

router.get('/', verify, (req, res) => {
    User.find({_id: req.userId}, (err, user) =>{
        if(err) return err
        return res.json({id: user[0]._id, username: user[0].username})
    }) 
})

module.exports = router;