const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwtGenerator = require('../jwtGenerator')
const fetch = require('node-fetch')
const router = express.Router();

router.post('/', async (req, res) => {
    const errors = []
    let {username, email, password, captcha } = req.body
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    username = username.toLowerCase()
    email = email.toLowerCase()
    const key = '6Lcq2FgdAAAAACRNYH_DZmnA0WE5YqU79-ZBF9ta'
    const verifyurl = `https://www.google.com/recaptcha/api/siteverify?secret=${key}&response=${captcha}&remoteip=${req.socket.remoteAddress}`

    if(!username || !email || !password) {
        errors.push({msg: 'Uzupełnij wszystkie pola', type: 'all'})
    }else {

        if(!re.test(email)) {
            errors.push({msg: 'Wpisz poprawny email', type: 'email'})
        } 

        if(password.length < 6) {
            errors.push({msg: 'Hasło musi mieć więcej niż 6 znaków', type: 'password'})
        }
        if(username.length < 3 || username.length > 20) {
            errors.push({msg: 'Nazwa użytkownika musi się mieścić w zakresie od 3 do 20 znaków', type: 'username'})
        }
        if(username.includes(" ") || format.test(username)) {
            errors.push({msg: 'Podaj prawidłową nazwę', type: 'username'})
        }
        if(captcha === undefined || captcha === '' || captcha === null){
            errors.push({msg: 'Zatwierdź recaptche', type: 'recaptcha'})
        }
    }
    if(errors.length > 0) {
        res.json(errors)
    } else {
        try {
            const response = await fetch(verifyurl)
            const data = await response.json()

            if(data.success !== undefined && !data.success){
                errors.push({msg: 'Zatwierdź recaptche', type: 'recaptcha'})
                return res.json(errors)
            }
            const result = await User.find({email})
                if(result.length > 0) {
                    errors.push({msg: 'Już istnieje konto z tym email', type: 'email'})
                    return res.json(errors)
                }
            const isuser =  await User.find({username})
    
                if(isuser.length > 0) {
                    errors.push({msg: 'Już istnieje konto z tym nickiem', type: 'username'})
                    return res.json(errors)
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
                        const token = jwtGenerator(user._id)
                        return res.cookie('access_token', token, {httpOnly: true, sameSite: 'lax', secure: true, maxAge: 1000 * 3600 * 24 * 30 * 2}).json({auth: true})
              
            }))
            }catch (err) {
                res.status(500).send()
            }
        }
})

module.exports = router