const path = require('path')
const express = require('express')
const asyncHandler = require('express-async-handler')
const multer = require('multer')
const { protect } = require('../middleware/auth')
const Property = require('../models/Property')

const router = express.Router()


// router.use(protect)

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'images/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images only!')
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})

router.post('/multiple', upload.array('image', 8), asyncHandler(async (req, res) => {
    
    

    let imageArray = []
    for (let i = 0; i < req.files.length; i++) {
        imageArray.push(req.files[i].filename)
        
    }
    res.json({
        success: true,
        IMAGES: imageArray
    })
    
 
}))

router.post('/:id', upload.single('image'), asyncHandler(async (req, res) => {
    
    

    // res.json({
    //     IMAGE: req.file.filename
    // })
    const property = await Property.findById(req.params.id)
    
    if(property) {
        property.firstImage = req.file.filename
        // user.lastLoginDate = Date.now()
        
        await property.images.push(req.file.filename)
        await property.save()
        
        res.json({
            success: true,
            IMAGE: req.file.filename
        })
    } else {
        res.status(404)
        throw new Error('Property Not Found. Kindly Login as a user')
    }
    
 
}))



router.post('/multiple/:id', upload.array('image', 8), asyncHandler(async (req, res) => {
    
    

    // res.json({
    //     IMAGE: req.file.filename
    // })
    const property = await Property.findById(req.params.id)
    let imageArray = []
    if(property) {
        // user.lastLoginDate = Date.now()
        for (let i = 0; i < req.files.length; i++) {
            imageArray.push(req.files[i].filename)
            await property.images.push(req.files[i].filename)
            await property.save()
        }
        
        
        res.json({
            success: true,
            IMAGES: imageArray
        })
    } else {
        res.status(404)
        throw new Error('Property Not Found. Kindly Login as a user')
    }
    
 
}))



module.exports = router