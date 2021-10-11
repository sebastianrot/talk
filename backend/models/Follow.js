const mongoose = require('mongoose')
const db = require('../db-config')

const followSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    follower: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: {type: String},
    date: {type: Date, default: Date.now}
})


module.exports = mongoose.model('Follow', followSchema)