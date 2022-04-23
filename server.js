//////////////////////////
// importing dependencies
//////////////////////////

require('dotenv').config() // get our .env variables
const express = require('express') // web framework
const mongoose = require('mongoose') // Object Document Manager (Work w/ DB)
const methodOverride = require('method-override') // overrides request method
const morgan = require('morgan') // used for logging

///////////////////////////
// Set Up Database Connection
///////////////////////////
// loading db url
const DATABASE_URL = process.env.DATABASE_URL

// establish connection
mongoose.connect(DATABASE_URL)

// Save the connection 
const connection = mongoose.connection

// set up mongoose messages
connection
.on('open', () => console.log('The Mongo connection is Open'))
.on('closed', () => console.log('The Mongo connection is closed'))
.on('error', (err) => console.log('The Mongo connection errored'))

////////////////////////////////
// Schemas and Models
////////////////////////////////

//////////////////////////////
// Create Express Application
////////////////////////////
const app = express()

//////////////////////////////
// Middleware - app.use(middleware function)
/////////////////////////////
app.use(methodOverride('_method')) // override request methods for form submissions
app.use(morgan('dev')) // log every request
app.use(express.urlencoded({extended: true})) // parse html form bodies into req.body
app.use('/static', express.static('static')) // serve files statically

/////////////////////////////
// Routes
//////////////////////////////
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`listening on ${PORT}`))