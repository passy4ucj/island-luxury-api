const mongoose = require('mongoose')


const propertySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    title: {
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
    address: {
        type: String,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true,
        default: 0
    },
    bath: {
        type: Number,
        required: true,
        default: 0
    },
    toilet: {
        type: Number,
        required: true,
        default: 0
    },
    parkingSpace: {
        type: Boolean,
        required: true,
        default: false
    },
    furnished: {
        type: Boolean,
        required: true,
        default: false
    },
    serviced: {
        type: Boolean,
        required: true,
        default: false
    },
    shared: {
        type: Boolean,
        required: true,
        default: false
    },
    square: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
    },
    images: [
        {
            type: String,
        }
    ],
    firstImage: {
        type: String
    },
    secondImage: {
        type: String
    },
    thirdImage: {
        type: String
    },
    approved: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})


const Property = mongoose.model('Property', propertySchema)

module.exports = Property