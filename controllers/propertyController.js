const Property = require('../models/Property')
const asyncHandler = require('express-async-handler')

const createProperty = asyncHandler(async (req, res) => {
    const {
        title,
        price,
        state,
        lga,
        address,
        category,
        propertyType,
        bedrooms,
        bath,
        toilet,
        parkingSpace,
        square,
        furnished,
        serviced,
        shared,
        description,
    } = req.body


    try {
        const property = await Property.create({
            title,
            price,
            state,
            lga,
            address,
            category,
            propertyType,
            bedrooms,
            bath,
            toilet,
            parkingSpace,
            square,
            furnished,
            serviced,
            shared,
            description,
            createdBy: req.user.id
        })

        res.json({
            success: true,
            property
        })
    } catch (error) {
        res.status(500)
        throw new Error(`Server error ${error}`)
    }
})

const getProperties = asyncHandler(async (req, res) => {
    try {
        const properties = await Property.find({}).populate('createdBy')

        res.json({
            success: true,
            properties
        })
    } catch (error) {
        res.status(500)
        throw new Error(`No properties`)
    }
})

const getApprovedProperties = asyncHandler(async (req, res) => {
    const properties = await Property.find({}).populate('createdBy')


    function checkProperties(property) {
        return property.approved;
    }

    if(properties) {
        const approved = properties.filter(checkProperties)   

        res.json({
            success: true,
            data: approved
        })
    } else {
        res.json({
            success: true,
            data: 'No Properties'
        })
    }

    
})


const getAgentProperties = asyncHandler(async (req, res) => {
    const properties = await Property.find({ createdBy: req.user.id }).populate('createdBy')

    if(properties) {
       
        res.json({
            success: true,
            data: properties
        })
    } else {
        res.json({
            success: true,
            data: 'No Properties'
        })
    }

    
})

const getPropertyById = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id).populate('createdBy')

    if(property) {
        res.json({
            success: true,
            property
        })
    } else {
        res.status(404)
        throw new Error('Property Not Found')
    }
})

const adminUpdateProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id)

    if(property) {
        
        property.approved = req.body.approved
       

        const updatedProperty = await property.save()


        res.json({
            success: true,
            message: 'Property updated'
        })
    } else {
        res.status(404)
        throw new Error('Property not found!')
    }
})


module.exports = {
    createProperty,
    getProperties,
    getApprovedProperties,
    getPropertyById,
    adminUpdateProperty,
    getAgentProperties,
}