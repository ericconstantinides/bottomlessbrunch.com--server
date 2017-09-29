const mongoose = require('mongoose')
const Schema = mongoose.Schema
const enumerables = require('../enumerables')

const VenueSchema = new Schema({
  name: { type: String, required: true },
  region: { type: Schema.Types.ObjectId, ref: 'Region' },
  gpId: { type: String, unique: true },
  yId: { type: String, unique: true },
  zomatoId: Number,
  updated: [ Date ],
  created: Date,
  neighborhood: String,
  yMeta: Object,
  gMeta: Object,
  fullBar: Boolean,
  address: {
    street: String,
    city: String,
    state: { type: String, enum: enumerables.states },
    zip: Number
  },
  phone: String,
  lat: Number,
  lng: Number,
  funTimes: [{
    category: { type: String, enum: enumerables.timeCategories },
    startTime: { type: String, enum: enumerables.times },
    endTime: { type: String, enum: enumerables.times },
    days: [{ type: String, enum: enumerables.days }],
    remarks: String
  }],
  funItems: [{
    name: String,
    price: Number
  }],
  research: [{
    url: { type: String },
    remarks: { type: String },
    updated: { type: String }
  }],
  images: [{
    fileName: String,
    category: String,
    height: Number,
    width: Number
  }],
  website: String,
  facebookUrl: String,
  openTableUrl: String,
  tripAdvisorUrl: String,
  zagatUrl: String,
  zomatoUrl: String
})

module.exports = mongoose.model('Venue', VenueSchema)
