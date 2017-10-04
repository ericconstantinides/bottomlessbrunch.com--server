const Yelp = require('node-yelp-api-v3')
const config = require('../config')
const {
  CLIENT_ID: consumer_key,
  CLIENT_SECRET: consumer_secret
} = config.YELP_KEYS

const yelp = new Yelp({ consumer_key, consumer_secret })

exports.yelp_phone_search = function (req, res) {
  const { number } = req.query
  const phoneNumber = decodeURI(number)
  yelp.searchBusinessPhone(phoneNumber)
    .then(result => res.json(result))
}
