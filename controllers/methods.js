const Yelp = require('node-yelp-api-v3')
const config = require('../config')
const yParser = require('./yParser')

const {
  CLIENT_ID: consumer_key,
  CLIENT_SECRET: consumer_secret
} = config.YELP_KEYS

const yelp = new Yelp({ consumer_key, consumer_secret })

exports.yelp_phone_search = function (req, res) {
  const { phone } = req.query
  const phoneNumber = decodeURI(phone)
  yelp.searchBusinessPhone(phoneNumber).then(result => {
    // remove any "is_closed" results:
    const filtered = result.businesses.filter(venue => !venue.is_closed)
    res.json(filtered)
  })
}

exports.yelp_id_search = function (req, res) {
  const { id } = req.query
  yelp.getBusinessById(id).then(result => {
    // remove any "is_closed" results:
    // const filtered = result.businesses.filter(venue => !venue.is_closed)
    res.json(result)
  })
}

exports.yelp_meta_search = function (req, res) {
  yParser(req.query.id, yMeta => res.json(yMeta))
}
