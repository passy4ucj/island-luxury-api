const bcrypt = require('bcryptjs')
const currentDate = Date.now
const users = [
    {
        firstname: "Admin",
        lastname: "User",
        email: "admin@outcess.com",
        username: "admin.01",
        phoneNumber: "0807684733",
        password: bcrypt.hashSync('123456', 10),
        role: "admin",
    }
    
   ]

module.exports = users