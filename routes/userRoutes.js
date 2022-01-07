const express = require('express')
const { register, getUsers, adminUpdateUser, adminResetPassword } = require('../controllers/userController')
const { protect, authorize } = require('../middleware/auth')


const router = express.Router()

router.use(protect)
router.use(authorize('admin'))

router.route('/')
    .get(getUsers)
     

router.route('/register')
    .post(register)


router.route('/:id')
    .put(adminUpdateUser)

router.route('/resetpassword/:id')
    .put(adminResetPassword)




module.exports = router