const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define our model
const RegionSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    unique: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  zoom: {
    type: Number
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  }
})

module.exports = mongoose.model('Region', RegionSchema)
