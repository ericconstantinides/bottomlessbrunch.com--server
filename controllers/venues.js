const axios = require('axios')
const G_BASE_URL = 'https://maps.googleapis.com/maps/api/place/details/json'
const API_KEY = 'AIzaSyDsJWQDeqiFe-Chw1tBWfitg_7rGSWmHTU'
const Venue = require('../models/Venue')
const yParser = require('./yParser')

exports.venue_list = function (req, res) {
  Venue.find({}, function (err, venue) {
    if (err) res.send(err)
    res.json(venue)
  })
}

exports.venue_create = function (req, res) {
  const newVenue = new Venue(req.body)
  if (newVenue.gpId || newVenue.yId) {
    const fetchedTime = new Date()
    if (newVenue.gpId) {
      axios
        .get(`${G_BASE_URL}?placeid=${newVenue.gpId}&key=${API_KEY}`)
        .then(res => {
          const gData = res.data.result
          newVenue.gMetaData = gData
          newVenue.gMetaData.fetchedTime = fetchedTime
          // derive the gData:
          newVenue.position.lat = gData.geometry.location.lat
          newVenue.position.lng = gData.geometry.location.lng
          newVenue.phone = gData.formatted_phone_number
          newVenue.website = gData.website
          newVenue.address = gData.adr_address
          newVenue.neighborhood = gData.address_components[2].long_name
          // crappy way of making sure that either yData or gData are both done
          if (newVenue.yMetaData) {
            newVenue.save(function (err, venue) {
              if (err) res.send(err)
              res.json(venue)
            })
          }
        })
    }
    if (newVenue.yId) {
      yParser(newVenue.yId, yMetaData => {
        newVenue.yMetaData = yMetaData
        newVenue.yMetaData.fetchedTime = fetchedTime
        // crappy way of making sure that either yData or gData are both done
        if (newVenue.gMetaData) {
          newVenue.save(function (err, venue) {
            if (err) res.send(err)
            res.json(venue)
          })
        }
      })
    }
  } else {
    newVenue.save(function (err, venue) {
      if (err) res.send(err)
      res.json(venue)
    })
  }
}

exports.venue_detail = function (req, res) {
  Venue.findById(req.params.venueId, function (err, venue) {
    if (err) res.send(err)
    res.json(venue)
  })
}

exports.venue_update = function (req, res) {
  Venue.findOneAndUpdate(
    { _id: req.params.venueId },
    req.body,
    { new: true },
    function (err, venue) {
      if (err) res.send(err)
      res.json(venue)
    }
  )
}

exports.venue_delete = function (req, res) {
  Venue.remove({ _id: req.params.venueId }, function (err, venue) {
    if (err) res.send(err)
    res.json({ message: 'Task successfully deleted' })
  })
}
