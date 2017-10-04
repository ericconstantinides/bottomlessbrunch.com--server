const Venue = require('../models/Venue')

exports.venue_list = function (req, res) {
  Venue.find({}, function (err, venue) {
    if (err) res.send(err)
    res.json(venue)
  })
}

exports.venue_create = function (req, res) {
  const newVenue = new Venue(req.body)
  newVenue.save(function (err, venue) {
    if (err) res.send(err)
    res.json(venue)
  })
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
