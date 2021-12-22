const express = require('express')
const User = require('../models/User')
const Group = require('../models/Group')
const router = express.Router();

router.get('/', async(req, res) => {
    const query = req.query

    try {
       const result = await User.find({username: {$regex: new RegExp(`${query.q}.*`, 'i')}}).select({password: 0}).sort({verified: -1}).limit(4)
        res.json(result)
    } catch (err) {
        res.status(500).send()
    }
})

router.get('/users', async(req, res) => {
    const query = req.query
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    try {
        if(query.q === '' || format.test(query.q)) return res.json([])
       const result = await User.find({username: {$regex: new RegExp(`${query.q}.*`, 'i')}}).select('username img desc verified').sort({verified: -1})
        res.json(result)
    } catch (err) {
        res.status(500).send()
    }
})

router.get('/groups', async(req, res) => {
    const query = req.query
    const format = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    try {
        if(query.q === '' || format.test(query.q)) return res.json([])
       const result = await Group.find({name: {$regex: new RegExp(`${query.q}.*`, 'i')}, hide: false}).sort({verified: -1})
        res.json(result)
    } catch (err) {
        res.status(500).send()
    }
})

module.exports = router