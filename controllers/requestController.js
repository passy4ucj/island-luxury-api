const Request = require('../models/Request')
const asyncHandler = require('express-async-handler')

const propertyRequest = asyncHandler(async (req, res) => {
    const {
        email,
        fullname,
        phoneNumber,
        property,
        budget,
        beds,
        comments,
    } = req.body


    try {
        const request = await Request.create({
            email,
            fullname,
            phoneNumber,
            property,
            budget,
            beds,
            comments,
        })

        res.json({
            success: true,
            request
        })
    } catch (error) {
        res.status(500)
        throw new Error(`Server error ${error}`)
    }
})

const getRequests = asyncHandler(async (req, res) => {
    try {
        const requests = await Request.find({}).populate('property')

        res.json({
            success: true,
            requests
        })
    } catch (error) {
        res.status(500)
        throw new Error(`No requests`)
    }
})


const getRequestById = asyncHandler(async (req, res) => {
    const request = await Request.findById(req.params.id).populate('property')

    if(request) {
        res.json({
            success: true,
            request
        })
    } else {
        res.status(404)
        throw new Error('Property Not Found')
    }
})


module.exports = {
    propertyRequest,
    getRequests,
    getRequestById,
}