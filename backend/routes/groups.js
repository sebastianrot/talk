const express = require('express')
const verify = require('../middlewares/jwt-verify')
const Group = require('../models/Group')
const User = require('../models/User')
const router = express.Router();

router.get('/', verify, async(req, res) => {
    const query = req.query.q
try{
    const user = await User.find({_id: req.userId})
    const result = await Group.find(query !== 'recommended' ? {category:query, hide: false} : {category: user[0].category, hide: false}).sort({date: -1, verified: 1})
    if(result.length === 0) return res.status(404).send()
    return res.json({groups: result})
}catch (err) {
    res.status(500).send()
}
})

module.exports = router