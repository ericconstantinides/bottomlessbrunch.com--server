const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define our model
const RegionSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  zoom: {
    type: Number,
    min: 0
  },
  position: {
    lat: Number,
    lng: Number
  }
})

module.exports = mongoose.model('Region', RegionSchema)
