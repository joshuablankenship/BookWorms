const mongoose = require('mongoose');
const MONGOLINK = require('../config.js');

mongoose.connect(MONGOLINK.MONGOLINK);

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const saveUser = (name, pass) => {
  const user = new User({
    username: name,
    password: pass,
  });
  user.save((error) => {
    if (error) {
      console.error(error);
    } else {
      console.log(user);
      console.log('Your user has been saved!');
    }
  });
};
const findUser = (name, callback) => {
  User.findOne({ username: name }, (err, user) => {
    if (err) {
      callback(err, null);
    } else {
      console.log('found', name);
      callback(null, user);
    }
  });
};

module.exports.findUser = findUser;
module.exports.saveUser = saveUser;
