const express = require('express')
const verify = require('../middlewares/jwt-verify')
const Comment = require('../models/Comment')
const router = express.Router();

router.get('/:id/comments', async(req, res) => {
    const id = req.params.id
try{
    const result = await Comment.find({post: id}).populate('by').sort({date: -1})
    if(result.length === 0) return res.status(404).send()
     const comment = result.map(value=>(
         {id: value._id, text: value.text, 
        like: value.like.length, date: value.date}))

     const user = result.map(value=>(
         {id: value.by._id, username: value.by.username,
         photo: value.by.img, verified: value.by.verified}))

    return res.json({comment, user})
}catch (err) {
    res.status(500).send()
}
})



router.post('/:id/comment/add', verify, async(req, res) => {
    const id = req.params.id
    console.log('post wysłany')
    const {comment} = req.body
    const commentData= new Comment({
        text: comment,
        post: id,
        by: req.userId
    })
try {
        await commentData.save()
        return res.json({add: true})
}catch (err) {
    res.status(500).send()
}
})


module.exports = router