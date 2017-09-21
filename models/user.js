const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

// Define our model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,   // field must be unique
    lowercase: true // saves it as lowercase
  },
  password: String
})

// On pre Save Hook, encrypt password
// Before saving a model:
userSchema.pre('save', function (next) {
  // generate a salt then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }

    // hash / encrypt our password using the salt
    bcrypt.hash(this.password, salt, null, (err, hash) => {
      if (err) { return next(err) }

      // overwrite plain text password with encrypted password
      this.password = hash
      next()
    })
  })
})

// create a method to compare passwords
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  // compare the candidate vs what we already have (this.password)
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) { return callback(err) }

    callback(null, isMatch)
  })
}

// Create the ModelClass:
// This loads the model as a collection of 'user'
module.exports = mongoose.model('user', userSchema)
