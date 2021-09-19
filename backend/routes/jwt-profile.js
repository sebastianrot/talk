const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = function(req, res, next) {
    const token = req.cookies.access_token
    if(!token) return next()
    

        jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
            if(err) return next()

            req.userId = decoded.id
            next()
        })
}