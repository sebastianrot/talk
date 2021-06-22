const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.cookie('access_token', '', {
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        expires: new Date(0)
    }).send()
})

module.exports = router