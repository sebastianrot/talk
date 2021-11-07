const express = require('express')
const Group = require('../models/Group')
const verify = require('../middlewares/jwt-verify')
const multer = require('multer')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const admin = require('../middlewares/admin-verify')
const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/profilegroup')
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

router.post('/:id/photo' , verify, admin, upload.single('image'), async(req, res) => {
    const group = req.params.id
    let file = req.file
    const parts = file.filename.split('.')
    let r = (Math.random() + 1).toString(36).substring(7);
    const name = `${parts[0]}-${r}.${parts[1]}`
try{
    await sharp(`${file.path}`).resize({height:400, width:400}).toFile(path.resolve(file.destination, `${name}`))
    fs.unlinkSync(file.path)
    await Group.updateOne({_id: group}, {img: name})
        return res.json({path: `profilegroup/${name}`})
}catch(err) {
    res.status(500).send()
}})


module.exports = router