const mongoose = require('mongoose')
const db = require('../db-config')

const postSchema = new mongoose.Schema({
    text: {type: String, default: ''},
    img: [{type: String}],
    by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    like: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    date: {type: Date, default: Date.now}
})


module.exports = mongoose.model('Post', postSchema)