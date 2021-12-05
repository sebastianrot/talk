const express = require('express')
const verify = require('../middlewares/jwt-verify')
const jwt = require('./jwt-profile')
const Comment = require('../models/Comment')
const Notification = require('../models/Notification')
const router = express.Router();

router.get('/:id/comments', jwt ,async(req, res) => {
    const id = req.params.id
    const comment = []
try{
    const result = await Comment.find({post: id}).populate('by', 'username img verified').lean().sort({date: 1})
    if(result.length === 0) return res.status(404).send()

    const sort = (val) => {
        if(val.parent !== '0') {
          const parent = result.find((p)=>val.parent === p._id.toString())
            parent.replies.push(val)
        }else{
          comment.push(val)
        }
    }

        result.forEach((val)=>{
                const likes = val.like.toString()
            if(likes.includes(req.userId)) {
                    Object.assign(val, {liked: true})
                }
                val.like = val.like.length
                Object.assign(val, {replies: []})
                sort(val)
                })
            console.log(comment)
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
        const user = await Comment.find({post: id}).select({by: 1, post: 1})
        if(user[0].by.toString() === req.userId) return res.json({add: true})
        const notificationData = new Notification({
        message: 'Ktoś napisał komentarz',
        sender: req.userId,
        receiver: user[0].by,
        type: 'post',
        ref: user[0].post
    })
        await notificationData.save()
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
        const access = await Comment.find({_id: id, post})
        if(access[0].by.toString() !== req.userId) return res.status(403).send()
        const subcomment = await Comment.find({parent: id, post})
        const idsubcomment = subcomment.map(val=>val._id)
        await Comment.deleteMany({$or: [{parent: {$in: idsubcomment}}, {parent: id, post}]})
        await Comment.deleteOne({_id: id, by: req.userId, post})
        return res.json({delete: true})
    }catch(err) {
        res.status(500).send()
    }
})


module.exports = router