// const User = require('mongoose').model('User');
// // const db = require('../database/index.js')
// const PassportLocalStrategy = require('passport-local').Strategy;

// /**
//  * Return the Passport Local Strategy object.
//  */
// module.exports = new PassportLocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password',
//   session: false,
//   passReqToCallback: true
// }, (req, email, password, done) => {
//   console.log(req.body);
//   const userData = {
//     email: email.trim(),
//     password: password.trim(),
//   };
// console.log(userData);
//   const newUser = new User(userData);
//   newUser.save((err) => {
//     if (err) {
//       console.log('error');
//       return done(err);
//     }
//     else {
//       console.log('saved to db');
//     }
//     return done(null);
//   });
// });
