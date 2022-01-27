const express = require('express')
const verify = require('../middlewares/jwt-verify')
const Feed = require('../models/Feed')
const router = express.Router();

router.get('/', verify, async(req, res) => {
const page = req.query.page
const skip = (page-1)*15

    try {
        const feed = await Feed.find({receiver: req.userId}).populate([{path: 'post', populate: {path: 'by', select: 'username img verified'}}]).populate('group').skip(skip).limit(15).sort({date: -1}).lean()
        if(feed.length === 0) return res.sendStatus(404)
        feed.forEach((value) => {
            const likes = value.post.like.toString()
            if(likes.includes(req.userId)) {
                Object.assign(value.post, {liked: true})
            }
            value.post.like = value.post.like.length
        })

        res.json(feed)
}catch (err) {
    console.log(err)
    res.status(500).send()
}
})

module.exports = router