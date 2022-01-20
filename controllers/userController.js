const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')


const register = asyncHandler(async (req, res) => {
    const {
        firstname,
        lastname,
        email,
        username,
        phoneNumber,
        password
    } = req.body

    if(!firstname || !lastname || !email || !username || !phoneNumber || !password) {
        res.status(400)
        throw new Error(`Please provide the required Informations`)
    }

    const lowerEmail = email.toLowerCase()
    const lowerUsername = username.toLowerCase()


    const userExists = await User.findOne({ email: lowerEmail })
    const userExistsByID = await User.findOne({ username: lowerUsername })
    if(userExists || userExistsByID) {
        res.status(400)
        throw new Error(`User already exists`)
    }

    
    

    const newUser = await User.create({
        firstname,
        lastname,
        email: lowerEmail,
        username: lowerUsername,
        phoneNumber,
        password,
    })

    res.json({
        success: true,
        message: 'User has been created',
        firstname: newUser.firstname,
        role: newUser?.role,
        token: generateToken(newUser._id)
    })
})

const login = asyncHandler(async (req, res) => {
    const {
        username,
        password
    } = req.body

    const lowerUserId = username.toLowerCase()

    // Validate agentId & password
    if(!username || !password) {
    res.status(400)
    throw new Error('Please provide a userId or password')
    }

    //Check for user
    const user = await User.findOne({ username: lowerUserId }).select('+password')

    if(!user) {
        res.status(401)
        throw new Error('User does not exist')
    }

      //Check if User is Activated
    // if(user.loginFlag) {
    //     // res.status(401)
    //     // throw new Error('Kindly Logout from previous device')
    //     res.json({
    //         success: false,
    //         message: 'User is already logged in another device'
    //     })
    //     return
    // }

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    if(process.env.NODE_ENV === 'production') {
        options.secure = true
    }
    
    // res.status(statusCode)
    //     .cookie('token', token, options)
    //     .json({
    //         success: true,
    //         token
    //     })

    //Check if Employee is Activated
    if(!user.isActive) {
        res.status(401)
        throw new Error('User not Activated')
    }

    // Check if password matchs
    const isMatch = await user.matchPassword(password)

    if(!isMatch) {
        res.status(401)
        throw new Error('Invalid Credentials')
    }

    user.loginFlag = true
    user.lastLoginDate = Date.now()
    await user.save()


    res.json({
        success: true,
        firstname: user.firstname,
        role: user?.role,
        token: generateToken(user._id)
    })


})

const myProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    
    if(user) {
        res.json({
            success: true,
            user
        })
    } else {
        res.status(400)
        throw new Error('User not found')
    }

})

const userUpdateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if(user) {
        user.firstname = req.body.firstname || user.firstname
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber
        user.lastname = req.body.lastname || user.lastname
    


        const updatedUser = await user.save()

        res.json({
            success: true,
            message: 'User profile updated'
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const adminResetPassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('+password')

    if(user) {
        user.password = req.body.newPassword

        await user.save()

        res.json({
            success: true,
            message: 'Password updated'
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const updatePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('+password')

    if(user) {
            
        // Check current password
        if(!(await user.matchPassword(req.body.currentPassword))) {
            res.status(404)
            throw new Error('Password Incorrect')
        }

        user.password = req.body.newPassword
        
        await user.save()

        res.json({
            success: true,
            token: generateToken(user._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const logout = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user.id)
    
    if(user) {
        user.loginFlag = false
        // user.lastLoginDate = Date.now()
        await user.save()


        res.cookie('token', 'none', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
        })
        
        res.status(200).json({
            success: true,
            message: 'Logout successful',
        })
    } else {
        res.status(404)
        throw new Error('User Not Found. Kindly Login as a user')
    }
    
})

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 })

    if(users) {
        res.json({
            success: true,
            data: users
        })
    } else {
        res.json({
            success: true,
            data: 'No User'
        })
    }
})


const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        res.json({
            success: true,
            user
        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

const adminUpdateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        user.firstname = req.body.firstname || user.firstname
        user.lastname = req.body.lastname || user.lastname
        user.email = req.body.email || user.email
        user.username = req.body.userId || user.username
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber
        user.role = req.body.role || user.role
        user.isActive = req.body.isActive
        user.subscribed = req.body.subscribed
        user.subscriptionPlan = req.body.subscriptionPlan || user.subscriptionPlan
        user.propertiesList = req.body.propertiesList || user.propertiesList

        const updatedUser = await user.save()

        res.json({
            success: true,
            message: 'User profile updated'
        })
    } else {
        res.status(404)
        throw new Error('User not found!')
    }
})

const adminUpdateRole = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        user.role = req.body.role
        const updatedUserRole = await user.save()

        res.json({
            success: true,
            message: 'User profile updated'
        })
    } else {
        res.status(404)
        throw new Error('User not found!')
    }
})





module.exports = {
    register,
    login,
    myProfile,
    userUpdateProfile,
    adminResetPassword,
    updatePassword,
    logout,
    getUsers,
    getUserById,
    adminUpdateUser,
}