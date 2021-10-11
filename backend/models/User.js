const mongoose = require('mongoose')
const db = require('../db-config')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    desc: {type: String, default: ''},
    img: {type: String, default: ''},
    priv: {type: Boolean, default: false},
    verified: {type: Boolean, default: false},
    ban: {type: Boolean, default: false},
    date: {type: Date, default: Date.now}
})


module.exports = mongoose.model('User', userSchema)