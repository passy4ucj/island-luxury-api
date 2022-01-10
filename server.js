const express = require('express')
const path = require('path')
const multer = require('multer')
const dotenv = require('dotenv')
const colors = require('colors')
const cors = require('cors')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')



// Creating an express app
const app = express()

const connectDB = require('./config/db')

// Initializing dotenv || Load env vars
dotenv.config({ path: './config/config.env' })


// Connect to database
connectDB()

// Import Route files
const users = require('./routes/userRoutes')
const auth = require('./routes/authRoutes')
const property = require('./routes/propertyRoutes')
const image = require('./routes/imageUploadRoutes')
const request = require('./routes/requestRoutes')


// Using JSON parser
app.use(express.json())

// Enable cors
app.use(cors())


// Mount routers
app.use('/api/v1/users', users)
app.use('/api/v1/auth', auth)
app.use('/api/v1/properties', property)
app.use('/api/v1/requests', request)
app.use('/api/v1/imageupload', image)


app.get('/', (req, res) => {
    res.json({
        message: 'REAL ESTATE'
    })
})

app.use(express.static('images'));


// Use error Middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${process.env.PORT}`))