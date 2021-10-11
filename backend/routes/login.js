const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwtGenerator = require('../jwtGenerator')
const router = express.Router();
require('dotenv').config()

router.post('/', async(req, res) => {
    let error
    const {email, password} = req.body

    if(!email || !password) {
       return res.json({error: 'Wprowadź dane'})
    } else {
    try{
        const user = await User.find({email, ban: false})
            if(user.length === 0) return res.json({error: 'Wprowadź poprawny email'})
            try {
                bcrypt.compare(password, user[0].password, (err, result) => {
                if(err) return err    
                if(!result) return res.json({error: 'Wprowadź poprawne hasło'})

                const token = jwtGenerator(user[0]._id)
                return res.cookie('access_token', token, { httpOnly: true}).json({auth: true})
                })
            }catch(e) {
                return(e)
            }
    }catch (err) {
        res.status(500).send()
    }
    }
})

module.exports = router
