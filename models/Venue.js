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
  yId: {
    type: String,
    unique: true
  },
  yMetaData: Object,
  gMetaData: Object,
  zomatoId: Number,
  fullBar: Boolean,
  researchNotes: String,
  phone: String,
  address: String,
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
    category: String,
    height: Number,
    width: Number
  }],
  menuItems: [{
    name: String,
    price: Number
  }],
  website: String,
  links: {
    facebook: String,
    yelp: String,
    openTable: String,
    tripAdvisor: String,
    zagat: String,
    zomato: String
  }
})

module.exports = mongoose.model('Venue', VenueSchema)
