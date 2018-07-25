const express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const path = require('path');
const bodyParser = require('body-parser');
const helpers = require('./helpers.js')
const db = require('../database/index.js')
// const items = require('');

const app = express();


 app.use(express.static(__dirname + '/../client/dist'));

// this is the average rating pulled from the HTML data.data.split('<average_rating>')[1].slice(0, 4)
// this will pull description from gooReads 90% data.data.split('<description>')[1].split(']')[0].slice(9)
app.get('/title', (req, res) => {
    // let title = req.body.title;
    // helpers.goodReadsData('Green Eggs and Ham')
    // .then(data => {
    //     console.log(data.data.split('<average_rating>')[1].slice(0, 4))
    //     console.log(data.data.split('<description>')[1].split(']')[0].slice(9))
    // })
    // .catch(err => console.log(err));
   
});


// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findUser(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });
  
  passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

  // Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

app.get('/login',
  function(req, res){
    res.render('login');
  });
  
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
  
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

app.listen(3000, () => {
    console.log('listening on port 3000!');
});