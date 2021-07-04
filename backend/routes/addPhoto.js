const express = require('express')
const db = require('../db-config')
const verify = require('../middlewares/jwt-verify')
const multer = require('multer')
const jimp = require('jimp')
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/profile')
    },
    filename: (req, file, cb) => {
        const parts = file.mimetype.split('/')
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
})

const upload = multer({
    storage: storage, 
    limits: {fileSize: 100000},
    fileFilter: (req, file, cb) => {
        if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            return cb(new Error('Plik nie jest obrazkiem'))
        }
        cb(null, true)
    }
})

router.post('/' , verify, upload.single('image'), (req, res) => {
    let file = req.file
    console.log(file)
    db.query('UPDATE images SET path = ?, mimetype = ?, date = ? WHERE id_user = ?', [`/static/profile/${file.filename}` ,file.mimetype, new Date(), req.userId], (err, result) => {
        if(err) return err
        return res.json({path: `profile/${file.filename}`})
    })

})

module.exports = router