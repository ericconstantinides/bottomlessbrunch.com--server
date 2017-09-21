const mongoose = require('mongoose')
const Schema = mongoose.Schema
const enumerables = require('../enumerables')

const VenueSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  region: {
    type: Schema.Types.ObjectId,
    ref: 'Region'
  },
  neighborhood: {
    type: String
  },
  position: {
    lat: Number,
    lng: Number
  },
  googlePlacesId: {
    type: String,
    unique: true
  },
  images: [{
    fileName: String,
    type: String,
    height: Number,
    width: Number
  }],
  hours: [{
    category: { enum: enumerables.timeCategories },
    starts: { enum: enumerables.time },
    ends: { enum: enumerables.time },
    days: [{ enum: enumerables.weekdays }]
  }],
  menuItems: [{
    name: String,
    price: Number
  }],
  fullBar: Boolean,
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
