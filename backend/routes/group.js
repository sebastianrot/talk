const express = require('express')
const verify = require('../middlewares/jwt-verify')
const Group = require('../models/Group')
const Join = require('../models/Join')
const router = express.Router();

router.get('/:id', async(req, res) => {
    const id = req.params.id
try{
    const result = await Group.findById(id)
    if(result.length === 0) return res.status(404).send()
    return res.json({group: result})
}catch (err) {
    res.status(500).send()
}
})



router.post('/create', verify, async(req, res) => {
    console.log('grupa stworzona')
    const data = req.body
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



module.exports = router