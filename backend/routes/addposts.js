const express = require('express')
const Post = require('../models/Post')
const verify = require('../middlewares/jwt-verify')
const multer = require('multer')
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/posts')
    },
    filename: (req, file, cb) => {
        const parts = file.mimetype.split('/')
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
})

const upload = multer({
    storage: storage, 
    limits: {fileSize: 2000000},
    fileFilter: (req, file, cb) => {
        if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            return cb(new Error('Plik nie jest obrazkiem'))
        }
        cb(null, true)
    }
})


router.post('/', verify, upload.array('images', 4), (req, res) => {
    const {text} = req.body
    const files = req.files
    const filesArray = []
    
    console.log(req.body.text)

    files.forEach(value => {
        filesArray.push(value.filename)
    })

    const postData = new Post({
        text: text,
        img: filesArray,
        by: req.userId
    })

    postData.save((err)=> {
        if(err) return err
    })
})

module.exports = router