const express = require('express')
const User = require('../models/User')
const verify = require('../middlewares/jwt-verify')
const bcrypt = require('bcryptjs')
const router = express.Router();

router.post('/', verify, async(req, res) => {
    const {password, newpassword} = req.body
try{
    const user = await User.find({_id: req.userId})
    if(newpassword.length < 6) return res.json({error: true})
    bcrypt.compare(password, user[0].password, (err, result) => {
        if(err) return err    
        if(!result) return res.json({error: true})
        bcrypt.genSalt(12, (err, salt) => bcrypt.hash(newpassword, salt, async(err, hash) => {
            if(err) throw err
            await User.updateOne({_id: req.userId}, {password: hash})
            res.json({add: true})
        }))
        })
}catch(err){
    res.status(500).send()
}
})



module.exports = router