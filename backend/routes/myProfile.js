const express = require('express')
const verify = require('../middlewares/jwt-verify')
const db = require('../db-config')
const router = express.Router();

router.get('/', verify, (req, res) => {
    db.query('SELECT * FROM users WHERE id = ?', req.userId, (err, user) => {
        if(err) return err
        return res.json({id: user[0].id, username: user[0].username, email: user[0].email})
    }) 
})

module.exports = router;