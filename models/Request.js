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
    property: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Property'
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