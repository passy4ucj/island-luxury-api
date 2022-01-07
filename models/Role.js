const mongoose = require('mongoose')


const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        unique: true,
        required: true
    },
    roleDescription: {
        type: String,
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})


const Role = mongoose.model('Role', roleSchema)

module.exports = Role