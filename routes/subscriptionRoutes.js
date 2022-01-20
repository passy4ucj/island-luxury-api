const express = require('express')
const { subscriptionRequest, getSubscriptions, getSubById } = require('../controllers/subscriptionController')
const { protect, authorize } = require('../middleware/auth')


const router = express.Router()

router.route('/')
    .post(protect, subscriptionRequest)
    .get(protect, authorize('admin'), getSubscriptions)

router.route('/:id')
    .get(protect, authorize('admin'), getSubById)



module.exports = router