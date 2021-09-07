const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = function(req, res, next) {
    const token = req.cookies.access_token
    if(!token) {
        req.logged = false
        return next()
    }

        jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
            if(err)  {
                req.logged = false   
                return next()
            }

            req.logged = true
            req.userId = decoded.id
            next()
        })
}