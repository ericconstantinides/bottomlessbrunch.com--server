const express = require('express')
const router = express.Router()

const venues = require('../controllers/venues')
const regions = require('../controllers/regions')
const methods = require('../controllers/methods')

router.route('/regions')
  .get(regions.region_list)
  .post(regions.region_create)

router.route('/regions/:regionId')
  .get(regions.region_detail)
  .put(regions.region_update)
  .delete(regions.region_delete)

router.route('/venues')
  .get(venues.venue_list)
  .post(venues.venue_create)

router.route('/venues/:venueId')
  .get(venues.venue_detail)
  .put(venues.venue_update)
  .delete(venues.venue_delete)

router.route('/methods/yelpPhoneSearch')
  .get(methods.yelp_phone_search)

module.exports = router
