const mongoose = require('mongoose')
const Schema = mongoose.Schema
const enumerables = require('../enumerables')

const VenueSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  region: {
    type: Schema.Types.ObjectId,
    ref: 'Region'
  },
  neighborhood: String,
  googlePlacesId: {
    type: String,
    unique: true
  },
  yelpId: {
    type: String,
    unique: true
  },
  zomatoId: {
    type: Number,
    unique: true
  },
  fullBar: Boolean,
  researchNotes: String,
  position: {
    lat: Number,
    lng: Number
  },
  hours: [{
    category: {
      type: String,
      enum: enumerables.timeCategories
    },
    startTime: {
      type: String,
      enum: enumerables.times
    },
    endTime: {
      type: String,
      enum: enumerables.times
    },
    days: [{
      type: String,
      enum: enumerables.days
    }]
  }],
  images: [{
    fileName: String,
    fileType: String,
    height: Number,
    width: Number
  }],
  menuItems: [{
    name: String,
    price: Number
  }],
  links: {
    website: String,
    facebook: String,
    yelp: String,
    openTable: String,
    tripAdvisor: String,
    zagat: String,
    zomato: String
  }
})

module.exports = mongoose.model('Venue', VenueSchema)
