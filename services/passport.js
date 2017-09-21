// The passport service checks if the user is authorized / logged in
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

const User = require('../models/user')
const config = require('../config')

// Options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

// Verify Login // Create local strategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  // Verify this email and password, call 'done' with the user
  // if it is the correct email and password
  // otherwise, call 'done' with false
  User.findOne({ email: email }, function (err, user) {
    if (err) { return done(err, false) }
    if (!user) { return done(null, false) }

    // compare password - is `password` === user.password
    user.comparePassword(password, function (err, isMatch) {
      if (err) { return done(err) }
      if (!isMatch) { return done(null, false) }

      // success!
      return done(null, user)
    })
  })
})

// Verify Token Access // Create JWT Strategy
// payload is the jwt token, payload.sub == payload subject aka id
// done is a callback function
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // See if the user id in the payload exists in our database
  // if it does, call 'done' using it
  // if it does not, call done without a user object
  User.findById(payload.sub, function (err, user) {
    if (err) { return done(err, false) }

    // if we find user, call done without an err:
    if (user) {
      done(null, user)
    } else {
      // don't find a user, call done without an err or a user:
      done(null, false)
    }
  })
})

// Tell passport to use strategies
passport.use(jwtLogin)
passport.use(localLogin)
