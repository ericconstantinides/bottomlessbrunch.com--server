const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()
const DB = process.env.DATABASE
const DB_USER = process.env.DB_USER
const DB_PWD = process.env.DB_PASSWORD
const DB_SRVR = process.env.DB_SERVER

// Use native Node promises
mongoose.Promise = global.Promise
mongoose
  .connect(`mongodb://${DB_USER}:${DB_PWD}@${DB_SRVR}/${DB}`, {
    useMongoClient: true
  })
  .then(() => console.log(`connection to ${DB} succesful`))
  .catch(err => console.error(err))

// App Setup
app.use(morgan('combined'))
app.use(cors()) // cors middleware
app.use(bodyParser.json({ type: '*/*' }))

// importing routes
const routes = require('./routes')
// NOT YET:
// const authRoutes = require('./routes/authRoutes')

// register the route
app.use('/api/v1', routes)
// NOT YET:
// app.use('/', authRoutes)

// Server Setup
const PORT = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(PORT)
console.log('Server listening on:', PORT)
