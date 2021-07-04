const express = require('express')
const db = require('../db-config')
const router = express.Router();

router.get('/', (req, res) => {
    const query = req.query
    console.log(query)
    db.query(`SELECT * FROM users WHERE username LIKE N'%${query.queries}%' LIMIT 4`, (err, result) => {
        if(err) return err
        console.log(result)
        res.json(result)
    })
})

module.exports = router