const mongoose = require('mongoose')
const db = require('../db-config')

const commentSchema = new mongoose.Schema({
    text: {type: String, default: ''},
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    like: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    parent: {type: String, ref: 'Comment'},
    date: {type: Date, default: Date.now}
})


module.exports = mongoose.model('Comment', commentSchema)