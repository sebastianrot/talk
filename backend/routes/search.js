const express = require('express')
const User = require('../models/User')
const router = express.Router();

router.get('/', async(req, res) => {
    const query = req.query
    console.log(query)
    try {
       const result = await User.find({username: {$regex: query.queries}})
        console.log(result)
        res.json(result)
    } catch (err) {
        res.status(500).send()
    }
})

module.exports = router