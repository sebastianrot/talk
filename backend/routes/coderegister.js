const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Token = require('../models/Token')
const jwtGenerator = require('../jwtGenerator')
const router = express.Router();
require('dotenv').config()

router.post('/code', async (req, res) => {
    let {username, email, password, token} = req.body
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const format = /^[a-z0-9_\.]+$/;
    username = username.toLowerCase()
    email = email.toLowerCase()

    if(!username || !email || !password || !token) {
        res.status(401).send()
    }else {

        if(!re.test(email)) {
            res.status(401).send()
        } 

        if(password.length < 6) {
            res.status(401).send()
        }
        if(username.length < 3 || username.length > 20) {
            res.status(401).send()
        }
        if(username.includes(" ") || !format.test(username)) {
            res.status(401).send()
        }
    }

        try {
            const result = await User.find({email})
                if(result.length > 0) {
                    return res.status(401).send()
                }
            const isuser =  await User.find({username})
    
                if(isuser.length > 0) {
                    return res.status(401).send()
                }

            const istoken = await Token.find({email})
            const date = new Date(istoken[0].date)
            const long = Math.abs(new Date() - date)
            const seconds = Math.floor(long / 1000)
            const minutes = Math.floor(seconds / 60)
 
            if(istoken[0].token !== token || minutes > 30 || istoken[0].email !== email) {
                return res.status(401).send()
            }

            bcrypt.genSalt(12, (err, salt) => bcrypt.hash(password, salt, async(err, hash) => {
                if(err) throw err

                    const userData = new User({
                        username: username,
                        email: email,
                        password: hash,
                        verified: false,
                    })

                   const user = await userData.save()
                   await Token.deleteOne({email})
                        const token = jwtGenerator(user._id)
                        return res.cookie('access_token', token, {httpOnly: true, sameSite: 'lax', secure: true, maxAge: 1000 * 3600 * 24 * 30 * 2}).json({auth: true})
              
            }))
            }catch (err) {
                res.status(500).send()
            }
})

module.exports = router