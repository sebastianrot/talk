const mongoose = require('mongoose')
const db = require('../db-config')

const joinSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
    status: {type: String},
    role:{type: String},
    date: {type: Date, default: Date.now}
})


module.exports = mongoose.model('Join', joinSchema)