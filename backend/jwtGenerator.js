const jwt = require('jsonwebtoken');

module.exports = function(id) {
    return jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: '60d'})
}