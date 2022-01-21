const mongoose = require('mongoose')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    firstname: { 
        type: String, 
        required: [true, 'Please add a firstname']
    },
    lastname: { 
        type: String, 
        required: [true, 'Please add a lastname'], 
    },
    email: { 
        type: String, 
        required: [true, 'Please add an email'], 
        unique: true,
    },
    username: { 
        type: String, 
        required: [true, 'Please add userId'], 
        unique: true,
    },
    phoneNumber: { 
        type: String, 
        required: [true, 'Please add userId'], 
        unique: true,
    },
    password: { 
        type: String, 
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    subscribed: {
        type: Boolean,
        default: false
    },
    subscriptionPlan: {
        type: String,
        enum: [
            'Bronze',
            'Basic',
            'Silver',
            'Gold'
        ],
        default: 'Basic'
    },
    propertiesList: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: [
            'user',
            'estate-agent',
            'admin',
        ],
        default: 'estate-agent'
    },
    loginFlag: {
        type: Boolean,
        default: false
    },
    lastLoginDate: {
        type: Date
    },
    
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})



// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next()
    }
    
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// Match user entered password to hash password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}



// Generate and hash password token
userSchema.methods.getResetPasswordToken = function() {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex')

    // Hash token and set to resetPasswordToken Field
    this.resetPasswordToken = crypto.createHash('sha256')
        .update(resetToken)
        .digest('hex')

    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

    return resetToken
}


const User = mongoose.model('User', userSchema)

module.exports = User