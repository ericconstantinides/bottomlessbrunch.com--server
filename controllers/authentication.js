const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config')

/**
 * creates a JSON Web Token
 * @param  {object} user a user
 * @return {string}      a created token
 */
function tokenForUser (user) {
  // we encode the _id since that never changes
  // sub is subject; iat = issued at time
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = function (req, res, next) {
  // User has already had their email and password auth'd
  // We need to give them a token
  // (req.user is given by Authentication.localLogin strategy):
  res.send({ token: tokenForUser(req.user) })
}

exports.signup = function (req, res, next) {
  // get the email and password off the request:
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).send({ error: 'Email and password are required' }) // (422 is unprocessable entity)
  }

  // See if a user with the given email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err) }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' }) // (422 is unprocessable entity)
    }
    // If a user with email does NOT exist, create a User Object:
    const user = new User({ email, password })

    // ...and save the record
    user.save(err => {
      if (err) { return next(err) }
      // Respond to request indicating the user was created
      res.json({ token: tokenForUser(user) })
    })
  })
}
