const express = require('express')
const Post = require('../models/Post')
const router = express.Router();

router.get('/hot', async(req, res)=> {
try{
    const t = await Post.aggregate([
        {$addFields: {long: {$subtract: [ "$$NOW", "$date" ]}}},
        {$project: { _id:0, text:1, like:1,date:1,
                     total: {$add: ['$long', 
                     {$log: [{$max:[{$size: "$like"},1]}, 10]}]}}},
        { $sort: {total: 1}} 
        ]);
        console.log(t)
        res.json(t)
}catch(err){
    res.status(500).send()
}
})

module.exports = router