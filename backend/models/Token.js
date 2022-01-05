const mongoose = require('mongoose')
const db = require('../db-config')

const tokenSchema = new mongoose.Schema({
    email: {type: String, required: true},
    token: {type: String, required: true},
    date: {type: Date, default: Date.now}
})


module.exports = mongoose.model('Token', tokenSchema)