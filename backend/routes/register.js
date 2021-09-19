const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwtGenerator = require('../jwtGenerator')
const router = express.Router();

router.post('/', async (req, res) => {
    console.log(req.body)
    const errors = []
    let {username, email, password } = req.body
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    email = email.toLowerCase()

    if(!username || !email || !password) {
        errors.push({msg: 'Uzupełnij wszystkie pola'})
    }else {

        if(!re.test(email)) {
            errors.push({msg: 'Wpisz poprawny email', type: 'email'})
        } 

        if(password.length < 6) {
            errors.push({msg: 'Hasło musi mieć więcej niż 6 znaków', type: 'password'})
        }
        if(username.length <= 3 || username.length > 20) {
            errors.push({msg: 'Nazwa użytkownika musi być się mieścić w zakresie od 3 do 20 znaków', type: 'username'})
        }
        if(username.includes(" ")) {
            errors.push({msg: 'Podaj prawidłową nazwę', type: 'username'})
        }
    }
    if(errors.length > 0) {
        res.json(errors)
    } else {
        try {
            const result = await User.find({email})
                console.log(result)
                if(result.length > 0) {
                    errors.push({msg: 'Już istnieje konto z tym email', type: 'email'})
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
                        return res.cookie('access_token', token, { httpOnly: true}).json({auth: true})
              
            }))
            }catch (err) {
                res.status(500).send()
            }
        }
})

module.exports = router