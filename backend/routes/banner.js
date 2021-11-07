const express = require('express')
const User = require('../models/User')
const verify = require('../middlewares/jwt-verify')
const multer = require('multer')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const router = express.Router()


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/banner')
    },
    filename: (req, file, cb) => {
        const parts = file.mimetype.split('/')
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
})

const upload = multer({
    storage: storage, 
    limits: {fileSize: 2097152},
    fileFilter: (req, file, cb) => {
        if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            return cb(new Error('Plik nie jest obrazkiem'))
        }
        cb(null, true)
    }
})


router.post('/banner', verify, upload.single('image'), async(req ,res) => {
    let file = req.file
    const parts = file.filename.split('.')
    let r = (Math.random() + 1).toString(36).substring(7)
    const name = `${parts[0]}-${r}.${parts[1]}`
try{
    await sharp(`${file.path}`).resize({height:500, width:1500}).toFile(path.resolve(file.destination, `${name}`))
    fs.unlinkSync(file.path)
    await User.updateOne({_id: req.userId}, {banner: name})
    return res.json({path: `banner/${name}`})
}catch(err){
    console.log(err)
    res.status(500).send()
}
})

module.exports = router