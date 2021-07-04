const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('../db-config')
const jwtGenerator = require('../jwtGenerator')
const router = express.Router();

router.post('/', (req, res) => {
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
        if(username.length < 3) {
            errors.push({msg: 'Nazwa użytkownika musi być dłuższa niż 3 znaki', type: 'username'})
        }
        if(username.includes(" ")) {
            errors.push({msg: 'Podaj prawidłową nazwę', type: 'username'})
        }
    }
    if(errors.length > 0) {
        res.json(errors)
    } else {
        db.query('SELECT * FROM users WHERE email = ?', email, (err, result) => {
            if(err) throw err
            if(result.length > 0) {
                errors.push({msg: 'Już istnieje konto z tym email', type: 'email'})
                return res.json(errors)
            }

            bcrypt.genSalt(12, (err, salt) => bcrypt.hash(password, salt, (err, hash) => {
                if(err) throw err

                db.query('INSERT INTO users (username, email, password, date) VALUES (? ,? ,? ,?)', [username, email, hash, new Date()], (err, result) => {
                    if(err) throw err
                    db.query('INSERT INTO images (path, mimetype, id_user, date) VALUES (? ,? ,? ,?)', ['/static/profile/default.jpeg', 'image/jpeg', result.insertId, new Date()], (er, resu) => {
                    const token = jwtGenerator(result.insertId)
                    return res.cookie('access_token', token, { httpOnly: true}).json({auth: true})
                    })
                })
            }))
        })  
    }
})

module.exports = router