const express = require('express')
const verify = require('../middlewares/jwt-verify')
const jwt = require('./jwt-profile')
const Comment = require('../models/Comment')
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
    const length = comment.split(" ").join("").length
    if(length > 0 && comment.length < 150){
        const add = await commentData.save()
        await add.populate('by', 'username img verified')
        return res.json(add)
    }
}catch (err) {
    res.status(500).send()
}
})



router.post('/:post/comment/:id/edit', verify, async(req,res)=> {
    const id = req.params.id
    const post = req.params.post
    const {text} = req.body
try{
    const length = text.split(" ").join("").length
    if(length > 0 && text.length < 150){
    await Comment.updateOne({_id: id, by: req.userId, post}, {text})
    res.json({edit: true})
    }
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