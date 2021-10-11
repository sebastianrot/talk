const express = require('express')
const verify = require('../middlewares/jwt-verify')
const Group = require('../models/Group')
const Join = require('../models/Join')
const ingroup = require('../ingroup')
const jwt = require('./jwt-profile')
const router = express.Router();

router.get('/:id', jwt, async(req, res) => {
    const id = req.params.id
try{
    const result = await Group.findById(id).lean()
    if(result.length === 0) return res.status(404).send()
    const status = await ingroup(id, req.userId)
    const group = {...result, status}
    return res.json(group)
}catch (err) {
    res.status(500).send()
}
})

router.get('/:id/members', verify, async(req, res)=> {
    const id = req.params.id
 try{
    const result = await Join.find({group: id, status: 'accept'}).populate('user')
    return res.json(result)
 }catch(err) {
    res.status(500).send()
}
})

router.post('/create', verify, async(req, res) => {
    console.log('grupa stworzona')
    const data = req.body
    if(req.body.hide && !req.body.priv) req.body.hide=false
    const groupData= new Group(data)
try {
        const save = await groupData.save()
        const joinData = new Join({user: req.userId, group: save._id, status: 'accept', role: 'admin'})
        await joinData.save()
        return res.json({add: true})
}catch (err) {
    res.status(500).send()
}
})


router.post('/:id/join', verify, async(req, res)=> {
    const id = req.params.id
    console.log(`Dołaczono ${id}`)
    try{
        const result = await Join.find({user: req.userId, group: id})
        if(result.length > 0) return res.json({join: true})
      const group = await Group.findById(id)
      const status = group.priv ? 'pending' : 'accept'
      const joinData = new Join({user: req.userId, group: id, status})
      await joinData.save()
      return res.json({add: true})
    }catch(err) {
        res.status(500).send()
    }
})


router.post('/:id/leave', verify, async(req,res) => {
    const id = req.params.id
    try{
        await Join.deleteOne({group: id, user: req.userId, status: 'accept'})
        return res.json({leave: true})
    }catch(err){
        res.status(500).send()
    }
})


module.exports = router