const express = require('express')
const { login, userUpdateProfile, updatePassword, getUserById, myProfile,  logout, register } = require('../controllers/userController')
const { protect, authorize } = require('../middleware/auth')


const router = express.Router()

router.route('/login')
    .post(login)

router.route('/logout')
    .get(protect, logout)


router.route('/register')
    .post(register)


router.route('/profile')
    .get(protect, myProfile)
    .put(protect, userUpdateProfile)

router.route('/:id')
    .get(protect, getUserById)


router.route('/updatepassword')
    .put(protect, updatePassword)






module.exports = router