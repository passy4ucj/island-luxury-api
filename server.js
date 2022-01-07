const express = require('express')
const dotenv = require('dotenv')



// Creating an express app
const app = express()



// Initializing dotenv || Load env vars
dotenv.config({ path: './config/config.env' })


// Import Route files


// Using JSON parser
app.use(express.json())


// Mount routers



app.get('/', (req, res) => {
    res.json({
        message: 'REAL ESTATE'
    })
})


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${process.env.PORT}`))