const mongoose = require('mongoose')
const db = require('../db-config')

const awardSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    img: {type: String, required: true},
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: {type: Date, default: Date.now}
})


module.exports = mongoose.model('Award', awardSchema)