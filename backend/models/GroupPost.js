const mongoose = require('mongoose')
const db = require('../db-config')

const GroupPostSchema = new mongoose.Schema({
    text: {type: String},
    img: [{type: String}],
    group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
    by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    like: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    date: {type: Date, default: Date.now}
})


module.exports = mongoose.model('GroupPost', GroupPostSchema)