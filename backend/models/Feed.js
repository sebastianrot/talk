const mongoose = require('mongoose')
const db = require('../db-config')

const feedSchema = new mongoose.Schema({
    post: {type: mongoose.Schema.Types.ObjectId, refPath: 'onModel', required: true},
    onModel: {type: String, required: true, enum: ['Post','GroupPost']},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
    date: {type: Date, default: Date.now}
})


module.exports = mongoose.model('Feed', feedSchema)