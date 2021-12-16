const mongoose = require('mongoose')
const db = require('../db-config')

const notificationSchema = new mongoose.Schema({
    message: {type: String},
    ref: {type: mongoose.Schema.Types.ObjectId, refPath: 'onModel', required: true},
    onModel: {type: String, required: true, enum: ['User','Post','GroupPost', 'Group']},
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    read: {type: Boolean, default: false},
    date: {type: Date, default: Date.now}
})


module.exports = mongoose.model('Notification', notificationSchema)