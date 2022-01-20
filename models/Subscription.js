const mongoose = require('mongoose')


const subscriptionSchema = new mongoose.Schema({
    subscriptionPlan: {
        type: String,
        enum: [
            'Premium',
            'Basic',
            'Silver',
            'Gold'
        ],
        default: 'Basic'
    },
    paymentDate: {
        type: Date,
        required: true
    },
    bank: {
        type: String,
        required: true
    },
    paymentChannel: {
        type: String,
        required: true
    },
    depositorsName: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})


const Subscription = mongoose.model('Subscription', subscriptionSchema)

module.exports = Subscription