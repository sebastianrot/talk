const express = require('express')
const db = require('../db-config')
const router = express.Router();

router.get('/:username', (req, res) => {
    const username = req.params.username
    
    db.query('SELECT images.id_user, users.username, users.email, users.verified, users.date, images.path FROM users LEFT JOIN images ON users.id = images.id_user WHERE users.username = ?', username, (err, user) => {
        if(err) return err
        if(user.length === 0) return res.sendStatus(404)
        console.log(user)
        return res.json({id_user: user[0].id_user, username: user[0].username, email: user[0].email, verified: user[0].verified ,date: user[0].date, path: user[0].path})
    })
})

module.exports = router