const mongoose = require('mongoose')


const requestSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    propertyType: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    lga: {
        type: String,
        required: true
    },
    budget: {
        type: Number
    },
    beds: {
        type: Number
    },
    comments: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})


const Request = mongoose.model('Request', requestSchema)

module.exports = Request