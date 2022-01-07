const Role = require('../models/Role')
const asyncHandler = require('express-async-handler')

const createRole = asyncHandler(async (req, res) => {
    const {
        roleName,
        roleDescription
    } = req.body

    try {
        const role = await Role.create({ roleName, roleDescription })

        res.json({
            success: true,
            role
        })
    } catch (error) {
        res.status(500)
        throw new Error(`Server error ${error}`)
    }
})

const getRoles = asyncHandler(async (req, res) => {
    try {
        const roles = await Role.find({})

        res.json({
            success: true,
            roles
        })
    } catch (error) {
        res.status(500)
        throw new Error(`No roles`)
    }
})


module.exports = {
    createRole,
    getRoles,
}