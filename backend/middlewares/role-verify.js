const Join = require('../models/Join')

module.exports = async function(req, res, next) {
const group = req.params.id
try{
    const result = await Join.find({user: req.userId, group, status: 'accept'})
    if(result.length === 0) return res.status(401).send()
    if(result[0].role === 'admin' || result[0].role === 'mod') return next()
    return res.status(401).send()
}catch{
    res.status(500).send()
}     
}