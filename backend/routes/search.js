const express = require('express')
const User = require('../models/User')
const Group = require('../models/Group')
const router = express.Router();

router.get('/', async(req, res) => {
    const query = req.query
    console.log(query)
    try {
       const result = await User.find({username: {$regex: query.q}}).sort({verified: -1}).limit(4)
        console.log(result)
        res.json(result)
    } catch (err) {
        res.status(500).send()
    }
})

router.get('/users', async(req, res) => {
    const query = req.query
    console.log(query)
    try {
        if(query.q === '' || query.q === '.') return res.json([])
       const result = await User.find({username: {$regex: query.q}}).select('username img verified').sort({verified: -1})
        console.log(result)
        res.json(result)
    } catch (err) {
        res.status(500).send()
    }
})

router.get('/groups', async(req, res) => {
    const query = req.query
    console.log(query)
    try {
        if(query.q === '' || query.q === '.') return res.json([])
       const result = await Group.find({name: {$regex: query.q}, hide: false}).sort({verified: -1})
        console.log(result)
        res.json(result)
    } catch (err) {
        res.status(500).send()
    }
})

module.exports = router