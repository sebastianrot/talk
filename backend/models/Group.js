const mongoose = require('mongoose')
const db = require('../db-config')

const groupSchema = new mongoose.Schema({
    name: {type: String},
    desc: {type: String, default: ''},
    img: {type: String},
    banner: {type: String},
    priv: {type: Boolean, default: false},
    hide: {type: Boolean, default: false},
    category: {type: String},
    verified: {type: Boolean, default: false},
    ban: {type: Boolean, default: false},
    date: {type: Date, default: Date.now}
})


module.exports = mongoose.model('Group', groupSchema)