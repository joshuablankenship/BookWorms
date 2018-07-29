const jwt = require('jsonwebtoken');
const db = require('../../database/index.js')
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');


/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  

  // find a user by name
  return db.passportValidate(username, password);
});
