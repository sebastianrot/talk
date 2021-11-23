const express = require('express')
const Post = require('../models/Post')
const GroupPost = require('../models/GroupPost')
const verify = require('../middlewares/jwt-verify')
const ingroup = require('../ingroup')
const multer = require('multer')
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/posts')
    },
    filename: (req, file, cb) => {
        const parts = file.mimetype.split('/')
        let r = (Math.random() + 1).toString(36).substring(7);
        cb(null, `${file.fieldname}-${Date.now()}-${r}.${parts[1]}`)
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


router.post('/post', verify, upload.array('images', 4), async(req, res) => {
    const {text} = req.body
    const files = req.files
    const filesArray = []

    files.forEach(value => {
        filesArray.push(value.filename)
    })

    const postData = new Post({
        text: text,
        img: filesArray,
        by: req.userId
    })
try{
    if(text.length < 10000 && (text.length > 0 || files.length > 0)){
    await postData.save()
    res.json({add: true})
    }
}catch (err) {
    res.status(500).send()
}
})


router.post('/group/:id/post', verify, upload.array('images', 4), async(req,res)=>{
    const id = req.params.id
    const {text} = req.body
    const files = req.files
    const filesArray = []

    files.forEach(value => {
        filesArray.push(value.filename)
    })

    try{
        if(text.length < 10000 && (text.length > 0 || files.length > 0)){
        const status = await ingroup(id, req.userId)
        if(status === 'accept') {
        let change = text.match(/#[\p{L}]+/ugi)
        let hashtag = [...new Set(change)]
        hashtag = hashtag===null?[]:hashtag
        const postData = new GroupPost({text: text, group: id, by: req.userId, img: filesArray, hashtag})
        await postData.save()
        res.json({add: true})
    }
   }
    return res.status(401).send()
    }catch(err){
        res.status(500).send()
    }
})

module.exports = router