const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const MONGOLINK= require('../config.js');
mongoose.connect(MONGOLINK.MONGOLINK, { useMongoClient: true });
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
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const bookSchema = mongoose.Schema({
  title: String,
  description: String,
  ISBN: Number,
  bookWormRating: Number,
  googleRating: Number,
  libThingRating: Number,
  goodReadsRating: Number,
  userRating: Number,
  cover: String,
});

const Book = mongoose.model('Book', bookSchema);
const saveBook = (bookObj, cb) => {
  const book = new Book({
    title: bookObj.title,
    description: bookObj.longDescript,
    ISBN: bookObj.ISBN13,
    bookWormRating: bookObj.aggregateRating,
    googleRating: bookObj.rating,
    libThingRating: bookObj.libThingRating,
    goodReadsRating: bookObj.gReadsRating,
    userRating: 2.5,
    cover: bookObj.coverImage,
  });
  book.save((err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(data);
    }
  });
};

const userBooksSchema = mongoose.Schema({
  username: String,
});

const UserBook = mongoose.model('UserBook', userBooksSchema);

const saveUser = (name, pass) => {
  var hash = bcrypt.hashSync(pass, 8);
  const user = new User({
    username: name,
    password: hash,
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
      console.log('found', user);
      callback(null, user);
      return true;
    }
  });
};

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 * * */
const comparePassword = (password) => {
  return bcrypt.compare(password, hash);
};


const passportValidate = (un, pw)=> {
User.findOne({ username: un}, (err, user) => {
  if (err) { return done(err); }

  if (!user) {
    const error = new Error('Incorrect username or password');
    error.name = 'IncorrectCredentialsError';

    return done(error);
  }

  // check if a hashed user's password is equal to a value saved in the database
  return comparePassword(pw, (passwordErr, isMatch) => {
    if (err) { return done(err); }

    if (!isMatch) {
      const error = new Error('Incorrect username or password');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }

    const payload = {
      sub: user._id
    };

    // create a token string
    const token = jwt.sign(payload, config.jwtSecret);
    const data = {
      name: user.name
    };

    return done(null, token, data);
  
  });
  
});
}
module.exports = {
  comparePassword,
  findUser,
  saveUser,
  saveBook,
  passportValidate
};

