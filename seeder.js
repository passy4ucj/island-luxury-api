const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
const users = require('./data/users')

//Load env vars
dotenv.config({ path: './config/config.env' })

//Load Models
const User = require('./models/User')


//Connect to DB
mongoose.connect(process.env.MONGO_URI)

// Import into DB
const importData = async () => {
    try {
        //await Employee.deleteMany()

        await User.insertMany(users)
        // await Role.insertMany(roles)

        console.log('Data Imported!'.green.inverse)
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

//Delete data from DB
const destroyData = async () => {
    try {
        await User.deleteMany()

        console.log('Data Destroyed!'.red.inverse)
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}