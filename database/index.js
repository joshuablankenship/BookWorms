const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const MONGOLINK= require('../config.js');
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

// const saveUser = (name, pass) => {
//   const user = new User({
//     username: name,
//     password: pass,
//   });
//   user.save((error) => {
//     if (error) {
//       console.error(error);
//     } else {
//       console.log(user);
//       console.log('Your user has been saved!');
//     }
//   });
// };
// const findUser = (username, callback) => {
//   User.findOne({ username }, (err, user) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       console.log('found', username);
//       callback(null, user);
//     }
//   });
// };



module.exports = {
  saveBook,
};

