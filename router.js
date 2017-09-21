const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

// use the JWT strategy; do not create a COOKIE based session (since we're using tokens)
const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = function (app) {
  // only run the function if it passes requireAuth
  app.get('/', requireAuth, function (req, res) {
    res.send({ message: 'Super secret code is ABC123' })
  })
  // requireSignin behaves as a middleware
  app.post('/signin', requireSignin, Authentication.signin)
  app.post('/signup', Authentication.signup)
}
