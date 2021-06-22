const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();
require('dotenv').config()

router.get('/', (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.json({auth: false})

        jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
            if(err) return res.json({auth: false})

            return res.json({auth: true})
        })
})

module.exports = router