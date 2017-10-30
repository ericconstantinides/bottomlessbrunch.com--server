const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const config = require('./config')

// Use native Node promises
mongoose.Promise = global.Promise
mongoose
  .connect(`mongodb://localhost/${config.DATABASE}`, { useMongoClient: true })
  .then(() => console.log(`connection to ${config.DATABASE} succesful`))
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
const PORT = process.env.PORT || config.PORT
const server = http.createServer(app)
server.listen(PORT)
console.log('Server listening on:', PORT)
