const express = require('express')
const verify = require('../middlewares/jwt-verify')
const Group = require('../models/Group')
const router = express.Router();

router.get('/', async(req, res) => {
    const query = req.query.q
try{
    const result = await Group.find(query !== 'all' ? {category:query} : {}).sort({date: -1})
    console.log(result)
    if(result.length === 0) return res.status(404).send()
    return res.json({groups: result})
}catch (err) {
    res.status(500).send()
}
})

module.exports = router