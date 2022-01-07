const express = require('express')
const { createRole, getRoles } = require('../controllers/roleController')
const { protect, authorize } = require('../middleware/auth')


const router = express.Router()

router.route('/')
    .post(protect, authorize('admin'), createRole)
    .get(protect, authorize('admin'), getRoles)


module.exports = router