const mongoose = require('mongoose')
const Schema = mongoose.Schema
const enumerables = require('../enumerables')

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
  state: {
    type: String,
    enum: enumerables.states
  },
  zoom: {
    type: Number,
    min: 0
  },
  position: {
    lat: Number,
    lng: Number
  },
  googlePlacesId: {
    type: String,
    unique: true
  }
})

module.exports = mongoose.model('Region', RegionSchema)
