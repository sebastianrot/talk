const express = require('express')
const verify = require('../middlewares/jwt-verify')
const Join = require('../models/Join')
const Group = require('../models/Group')
const isadmin = require('../isadmin')
const admin = require('../middlewares/admin-verify')
const router = express.Router();



router.get('/:id/accept', verify, admin, async(req, res)=> {
    const id = req.params.id
    try{
        const join = await Join.find({group: id, status: 'pending'}).populate('user', 'username img verified').sort({date: -1})
        return res.json(join)
    }catch(err) {
        res.status(500).send()
    }
})


router.post('/:id/desc', verify, admin, async(req, res)=>{
    const id = req.params.id
    const {desc} = req.body
    try {
        if(desc.length < 150){
        await Group.updateOne({_id: id}, {desc})
            res.json({add: true})
        }
    }catch (err) {
        res.status(500).send()
    }
})

router.post('/:id/user/:user/role', verify, admin, async(req, res)=>{
    const id = req.params.id
    const user = req.params.user
try{
    await Join.updateOne({group: id, user, status: 'accept'}, {role})
    return res.json({role: true})
}catch(err){
    res.status(500).send()
}
})

router.get('/:id/block', verify, admin, async(req, res)=> {
    const id = req.params.id
 try{
    const block = await Join.find({group: id, status: 'block'}).populate('user', 'username img verified').sort({date: -1})
    return res.json(block)
 }catch(err){
    res.status(500).send()
 }
})


router.post('/:id/user/:user/accept', verify, admin, async(req, res) => {
    const id = req.params.id
    const user = req.params.user
try{
        await Join.updateOne({group: id, user}, {status: 'accept'})
        return res.json({accept: true})
}catch(err) {
    res.status(500).send()
}
})


router.post('/:id/user/:user/reject', verify, admin, async(req, res) => {
    const id = req.params.id
    const user = req.params.user
    try{
            await Join.deleteOne({group: id, user})
            return res.json({reject: true})
    }catch(err) {
        res.status(500).send()
    }
})


router.post('/:id/user/:user/block', verify, admin, async(req, res) => {
    const id = req.params.id
    const user = req.params.user
try{
        await Join.updateOne({group: id, user}, {status: 'block'})
        return res.json({block: true})
}catch(err) {
    res.status(500).send()
}
})


module.exports = router