const express = require('express')
const Post = require('../models/Post')
const verify = require('./jwt-profile')
const mongoose = require("mongoose");
const router = express.Router();

router.get('/hot', verify ,async(req, res)=> {
    const page = req.query.page
    const skip = (page-1)*15
try{
    const trend = await Post.aggregate([
        {$addFields: {long: {$divide: [{$subtract: [ "$$NOW", "$date" ]}, 3600000]}}},
        {$lookup: {from: 'users', localField: 'by', foreignField: '_id', as: 'by'}},
        {$match: {'by.priv': false}},
        {$project: { text:1,like:1, img:1, date:1,by: {$arrayElemAt:["$by",0]}, liked: {$in: [new mongoose.Types.ObjectId(req.userId), '$like']},
                     total: {$divide: [{$subtract: [{$size: "$like"}, 1]},  {$pow: [{$add: ['$long', 2]}, 1.8]}]}
                }
                    },
        {$addFields: {like: {$size: "$like"}}},
        { $unset: ['by.password', 'by.email']},
        { $sort: {total: -1}},
        {$skip: skip},
        {$limit: 15}
        ]);
        
        res.json(trend)
}catch(err){
    res.status(500).send()
}
})

router.get('/best', verify, async(req, res)=> {
    const page = req.query.page
    const skip = (page-1)*15
try{
    const best = await Post.aggregate([
        {$lookup: {from: 'users', localField: 'by', foreignField: '_id', as: 'by'}},
        {$match: {'by.priv': false}},
        {$project: {text:1,like:1, img:1, date:1,by: {$arrayElemAt:["$by",0]}, liked: {$in: [new mongoose.Types.ObjectId(req.userId), '$like']}}},
        {$addFields: {like: {$size: "$like"}}},
        { $unset: ['by.password', 'by.email']},
        {$sort: {like: -1}},
        {$skip: skip},
        {$limit: 15}
    ])

    res.json(best)
}catch(err){
    res.status(500).send()
}
})

module.exports = router