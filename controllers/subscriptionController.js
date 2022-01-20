const Subscription = require('../models/Subscription')
const asyncHandler = require('express-async-handler')

const subscriptionRequest = asyncHandler(async (req, res) => {
    const {
        subscriptionPlan,
        paymentDate,
        bank,
        paymentChannel,
        depositorsName,
    } = req.body


    try {
        const subscription = await Subscription.create({
            subscriptionPlan,
            paymentDate,
            bank,
            paymentChannel,
            depositorsName,
            user: req.user.id,
        })

        res.json({
            success: true,
            subscription
        })
    } catch (error) {
        res.status(500)
        throw new Error(`Server error ${error}`)
    }
})

const getSubscriptions = asyncHandler(async (req, res) => {
    try {
        const subscriptions = await Subscription.find({}).populate('user')

        res.json({
            success: true,
            subscriptions
        })
    } catch (error) {
        res.status(500)
        throw new Error(`No subscriptions`)
    }
})


const getSubById = asyncHandler(async (req, res) => {
    const sub = await Subscription.findById(req.params.id).populate('user')

    if(sub) {
        res.json({
            success: true,
            sub
        })
    } else {
        res.status(404)
        throw new Error('Property Not Found')
    }
})


module.exports = {
    subscriptionRequest,
    getSubscriptions,
    getSubById,
}