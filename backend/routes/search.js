const express = require('express')
const User = require('../models/User')
const router = express.Router();

router.get('/', (req, res) => {
    const query = req.query
    console.log(query)
        User.find({username: {$regex: query.queries}}, (err, result) => {
        if(err) return err
        console.log(result)
        res.json(result)
    })
})

module.exports = router