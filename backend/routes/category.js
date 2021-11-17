const express = require('express')
const User = require('../models/User')
const verify = require('../middlewares/jwt-verify')
const router = express.Router();

router.post('/category/:category', verify, async(req, res) => {
    const category = req.params.category
    const c = ['sport', 'gry', 'nauka', 'muzyka', 'tech', 'auta', 'moda', 'zwierzęta', 'sztuka', 'biznes', 'jedzenie']
try{
    if(!c.includes(category)) return res.status(404).send()
    await User.updateOne({_id: req.userId}, {category})
        return res.json({category: true})
    }catch (err){
        res.status(500).send()
    }
})

module.exports = router