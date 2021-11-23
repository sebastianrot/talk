const mongoose = require('mongoose')
const db = require('../db-config')

const notificationSchema = new mongoose.Schema({
    message: {type: String},
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    read: {type: Boolean, default: false},
    date: {type: Date, default: Date.now}
})


module.exports = mongoose.model('Notification', notificationSchema)