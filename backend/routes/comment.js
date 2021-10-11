const express = require('express')
const verify = require('../middlewares/jwt-verify')
const Comment = require('../models/Comment')
const router = express.Router();

router.post('/:id/like', verify, async (req, res) => {
    const id = req.params.id
try {
     await Comment.updateOne({_id: id}, {$addToSet: {like: req.userId}})
        res.json({like: true})
 
}catch (err){
        res.status(500).send()
    }
})

router.post('/:id/unlike', verify, async (req, res) => {
    const id = req.params.id
try{
    await Comment.updateOne({_id: id}, {$pull: {like: req.userId}})
    res.json({like: false})
}catch(err) {
    res.status(500).send()
}
})

module.exports = router