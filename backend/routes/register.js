const express = require('express')
const User = require('../models/User')
const Token = require('../models/Token')
const fetch = require('node-fetch')
const sgMail = require('@sendgrid/mail');
const router = express.Router();
require('dotenv').config()

router.post('/', async (req, res) => {
    const errors = []
    let {username, email, password, captcha } = req.body
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const format = /^[a-z0-9_\.]+$/;
    username = username.toLowerCase()
    email = email.toLowerCase()
    const verifyurl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.KEY}&response=${captcha}&remoteip=${req.socket.remoteAddress}`

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
        if(username.includes(" ") || !format.test(username)) {
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

                let random = Math.random().toString(16).slice(2, 8)
                let output = `
                <div style='background: #f9f9f9; width: 100%;'>
                <center>
                <article style='background: #fff; margin: 0 auto; border-radius: 10px; border: 1px solid #dfdfdf; padding: 25px 40px 30px 40px; font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif; color: #333; max-width: 620px;'>
                <h2>Hej, ${username}!</h2>
                <div style='display: flex; flex-direction: column;'>
                <span>Zweryfikuj swojego emaila</span>
                <span>poniższy kod wprowadź na stronie</span>
                </div>
                <h3 style='font-weight: 700;'>${random}</h3>
                <div style='border-top: 1px solid #dcddde;margin-bottom: 12px;'></div>
                <div style='display:flex;flex-direction:column;'>
                <span style='font-size: 13px;'>Potrzebujesz pomocy? Skontaktuj się z nami</span>
                <span style='font-size: 13px;margin-top:3px;'>poprzez email: linnkappofficial@gmail.com</span>
                </div>
                </article>
                </center>
                </div>
                `

                const tokenData = new Token({
                    email: email,
                    token: random,
                })

                await tokenData.save()

                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const msg = {
                to: email,
                from: {
                    name: 'Linnk',
                    email: 'noreply@linnk.pl'
                }, 
                subject: 'Weryfikacja emaila',
                html: output,
                };
  
                sgMail.send(msg)
            
                res.json({auth: true})

            }catch (err) {
                res.status(500).send()
            }
        }
})

module.exports = router