const mongoose = require('mongoose')
const db = require('../db-config')

const followSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    follower: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: {type: Date, default: Date.now}
})


module.exports = mongoose.model('Follow', followSchema)