const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = function(req, res, next) {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json({msg: 'nie masz dostepu'})

        jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
            if(err) return res.status(400).json({error: 'nie prawidlowy token'})

            req.userId = decoded.id
            next()
        })
}