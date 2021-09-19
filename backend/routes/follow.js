const express = require('express')
const verify = require('../middlewares/jwt-verify')
const Follow = require('../models/Follow')
const router = express.Router();

router.post('/:id/follow', verify, async(req, res) => {
    const id = req.params.id
try{
        const result = await Follow.find({user: id, follower: req.userId})
            if(result.length > 0) return res.json({follow: true})
            const followData= new Follow({
                user: id,
                follower: req.userId
            })
            await followData.save()
            return res.json({follow: true})
}catch (err) {
    res.status(500).send()
}
})

router.post('/:id/unfollow', verify, async(req, res) => {
    console.log('unfollow')
    const id = req.params.id
try{
    await Follow.deleteOne({user: id, follower: req.userId})
    return res.json({follow: false})
}catch(err) {
    res.status(500).send()
}
})

module.exports = router