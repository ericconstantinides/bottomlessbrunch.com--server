const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = 3090
const DATABASE = 'bottomless_brunch'

// Use native Node promises
mongoose.Promise = global.Promise

// DB Setup
// Creates a new database called "auth"
mongoose.connect(`mongodb://localhost/${DATABASE}`, { useMongoClient: true })
  .then(() => console.log(`connection to ${DATABASE} succesful`))
  .catch((err) => console.error(err))

// App Setup
app.use(morgan('combined'))
app.use(cors()) // cors middleware
app.use(bodyParser.json({ type: '*/*' }))
router(app)

// Server Setup
const finalPort = process.env.PORT || PORT
const server = http.createServer(app)
server.listen(finalPort)
console.log('Server listening on: ', finalPort)
