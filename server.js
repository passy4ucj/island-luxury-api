const express = require('express')
const fs = require('fs')
const http = require('http')
const https = require('https')
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
const subscription = require('./routes/subscriptionRoutes')


// Using JSON parser
app.use(express.json())

// Enable cors
app.use(cors())


// Mount routers
app.use('/api/v1/users', users)
app.use('/api/v1/auth', auth)
app.use('/api/v1/properties', property)
app.use('/api/v1/requests', request)
app.use('/api/v1/subscriptions', subscription)
app.use('/api/v1/imageupload', image)


app.get('/', (req, res) => {
    res.json({
        message: 'REAL ESTATE'
    })
})

app.use(express.static('images'));

// const options = {
//     cert: fs.readFileSync(path.resolve(__dirname, 'island-ssl', 'island.crt'), 'utf8'),
//     key: fs.readFileSync(path.resolve(__dirname, 'island-ssl', 'island.key'), 'utf8'),
//     passphrase: process.env.PASS_PHRASE
// };

const options = {
    cert: fs.readFileSync(path.resolve(__dirname, 'outcess-ssl', 'outcess.pem'), 'utf8'),
    key: fs.readFileSync(path.resolve(__dirname, 'outcess-ssl', 'outcess.key'), 'utf8'),
    passphrase: process.env.PASS_PHRASE_OUTCESS
};


// Use error Middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 7000
if(process.env.NODE_ENV === 'production') {
    http.createServer(app).listen(PORT)
    https.createServer(options, app).listen(443)
} else {
    http.createServer(app).listen(PORT)
}
// app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${process.env.PORT}`))