const express = require('express')
const db = require('../db-config')
const verify = require('../middlewares/jwt-verify')
const router = express.Router();

router.get('/:id', (req, res) => {
    const id = req.params.id
    console.log(id)

    db.query('SELECT * FROM users WHERE id = ?', id, (err, user) => {
        if(err) return err
        if(user.length === 0) return res.sendStatus(404)
        return res.json({id: user[0].id, username: user[0].username, email: user[0].email, date: user[0].date})
    })
})

module.exports = router