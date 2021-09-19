const express = require('express')
const verify = require('../middlewares/jwt-verify')
const Join = require('../models/Join')
const isadmin = require('../isadmin')
const router = express.Router();



router.get('/:id/accept', verify, async(req, res)=> {
    const id = req.params.id
    try{
        const admin = await isadmin(id, req.userId)
        if(admin) {
        const join = await Join.find({group: id, status: 'pending'}).populate('user').sort({date: -1})
        console.log(join)
        return res.json(join)
        }
        return res.status(403).send()
    }catch(err) {
        res.status(500).send()
    }
})


router.post('/:id/user/:user/accept', verify, async(req, res) => {
    const id = req.params.id
    const user = req.params.user
try{
    const admin = await isadmin(id, req.userId)
    if(admin) {
        await Join.updateOne({group: id, user}, {status: 'accept'})
        return res.json({accept: true})
    }
}catch(err) {
    res.status(500).send()
}
})


router.post('/:id/user/:user/reject', verify, async(req, res) => {
    const id = req.params.id
    const user = req.params.user
    try{
        const admin = await isadmin(id, req.userId)
        if(admin) {
            await Join.deleteOne({group: id, user})
            return res.json({reject: true})
        }
    }catch(err) {
        res.status(500).send()
    }
})


router.post('/:id/user/:user/block', verify, async(req, res) => {
    const id = req.params.id
    const user = req.params.user
try{
    const admin = await isadmin(id, req.userId)
    if(admin) {
        await Join.updateOne({group: id, user}, {status: 'block'})
        return res.json({block: true})
    }
}catch(err) {
    res.status(500).send()
}
})


module.exports = router