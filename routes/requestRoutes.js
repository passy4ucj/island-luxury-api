const express = require('express')
const { propertyRequest, getRequests, getRequestById } = require('../controllers/requestController')
const { protect, authorize } = require('../middleware/auth')


const router = express.Router()

router.route('/')
    .post(propertyRequest)
    .get(protect, authorize('admin'), getRequests)

router.route('/:id')
    .get(protect, authorize('admin'), getRequestById)



module.exports = router