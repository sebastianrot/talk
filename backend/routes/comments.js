const express = require('express')
const verify = require('../middlewares/jwt-verify')
const Comment = require('../models/Comment')
const router = express.Router();

router.get('/:id/comments', async(req, res) => {
    const id = req.params.id
    const comment = []
try{
    const result = await Comment.find({post: id}).populate('by').lean().sort({date: 1})
    if(result.length === 0) return res.status(404).send()
        result.forEach((val)=>{
                const likes = val.like.toString()
                if(likes.includes(req.userId)) {
                    Object.assign(val, {liked: true})
                }
            if(val.parent === '0'){
                Object.assign(val, {replies: []})
                const reply = result.filter(el => val._id.toString() === el.parent) 
                val.replies.push(...reply)
                comment.push(val)
            }})
            console.log(result)
    return res.json(comment)
}catch (err) {
    res.status(500).send()
}
})



router.post('/:id/comment/add', verify, async(req, res) => {
    const id = req.params.id
    const {comment, parent} = req.body
    const commentData= new Comment({
        text: comment,
        post: id,
        by: req.userId,
        parent: parent
    })
try {
        await commentData.save()
        return res.json({add: true})
}catch (err) {
    res.status(500).send()
}
})



router.post('/:post/comment/:id/edit', verify, async(req,res)=> {
    const id = req.params.id
    const post = req.params.post
    const {text} = req.body
try{
    await Comment.updateOne({_id: id, by: req.userId, post}, {text})
    res.json({edit: true})
}catch (err) {
    res.status(500).send()
}
})

router.post('/:post/comment/:id/delete', verify, async(req,res)=> {
    const id = req.params.id
    const post = req.params.post
    try{
        await Comment.deleteOne({_id: id, by: req.userId, post})
        await Comment.deleteMany({parent: id, post})
        return res.json({delete: true})
    }catch(err) {
        res.status(500).send()
    }
})


module.exports = router