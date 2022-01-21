const express = require('express')
const { createProperty, getProperties, getApprovedProperties, getPropertyById, adminUpdateProperty, getAgentProperties } = require('../controllers/propertyController')
const { protect, authorize } = require('../middleware/auth')


const router = express.Router()

router.route('/')
    .post(protect, authorize('estate-agent', 'admin'), createProperty)
    .get(protect, authorize('admin'), getProperties)

router.route('/approved')
    .get(getApprovedProperties)

router.route('/agent')
    .get(protect, getAgentProperties)
 
router.route('/approved/:id')
    .put(protect, authorize('admin'), adminUpdateProperty)

router.route('/:id')
    .get(getPropertyById)



module.exports = router