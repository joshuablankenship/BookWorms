const mongoose = require('mongoose');
const MONGOLINK= require('../config.js');
const bcrypt = require('bcryptjs');
// mongoose.connect(MONGOLINK.MONGOLINK);
// plug in the promise library:
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    index: { unique: true }
  },
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
const findUser = (username, callback) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      callback(err, null);
    } else {
      console.log('found', username);
      callback(null, user);
    }
  });
};

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 * **/
const comparePassword = (password, callback) => {
  bcrypt.compare(password, this.password, callback);
};


/**
 * The pre-save hook method.
 */
userSchema.pre('save', function saveHook(next) {
 

  // proceed further only if the password is modified or the user is new
  if (!User.isModified('password')) return next();


  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      User.password = hash;

      return next();
    });
  });
});
module.exports.comparePassword = comparePassword;
module.exports.findUser = findUser;
module.exports.saveUser = saveUser;
