const express = require('express')
const Post = require('../models/Post')
const router = express.Router();

router.get('/hot', async(req, res)=> {
try{
   const result = await Post.find({})
   let date = new Date()
    const score = result.map(((val)=> Number(val.like.length) * Number(1/(1+(date-val.date))))) 
    console.log(score)
    const a = score.sort((a,b)=>b-a)
    res.json(a)
}catch(err){
    res.status(500).send()
}
})

module.exports = router