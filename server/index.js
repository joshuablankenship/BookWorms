

/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */

const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const path = require('path');
const bodyParser = require('body-parser');
const helpers = require('./helpers.js');
const db = require('../database/index.js');

const app = express();
// tell the app to look for static files in these directories
app.use(express.static(`${__dirname}/../client/dist`));
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));

// create application/json parser
const jsonParser = bodyParser.json();

// pass the passport middleware
app.use(passport.initialize());
// load passport strategies
const localLoginStrategy = require('./passport/local-login');

passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/auth-check');

app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);


app.post('/addRating', jsonParser, (req, res) => {
  const body = req.body;

  db.addRating(body.title, body.rating, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      console.log('rating added in server, success');
      res.send(201);
    }
  });
});
// topRated will pull all books rated over 3.5 and deliver them as array of book objects named top
app.get('/topRated', (req, res) => {
  const top = [];
  db.allBooks((err, books) => {
    if (err) {
      console.log(err);
    } else {
      books.forEach((book) => {
        if (book.bookWormRating > 1) {
          const uRatingLen = book.userRating.length;
          const allUserRatings = Math.round(book.userRating.reduce((accum, current) => {
            accum += +current;
            return accum;
          }, 0) / uRatingLen);
          const allRatings = Math.round(+book.googleRating + +book.libThingRating + +book.goodReadsRating + allUserRatings) / 4;
          top.push({
            title: book.title,
            longDescript: book.description,
            rating: book.googleRating,
            coverImage: book.cover,
            libThingRating: book.libThingRating,
            gReadsRating: book.goodReadsRating,
            userRating: allUserRatings,
            aggregateRating: allRatings,

          });
        }
      });
      top.sort((a, b) => {
        const ratingA = a.aggregateRating;
        const ratingB = b.aggregateRating;

        let comparison = 0;
        if (ratingA < ratingB) {
          comparison = 1;
        } else if (ratingA > ratingB) {
          comparison = -1;
        }
        return comparison;
      });
      res.send({ len: top.length, top });
    }
  });
});

app.post('/addReview', jsonParser, (req, res) => {
  const userReviews = [];
  const title = req.body.title;
  const username = req.body.username;
  const reviewText = req.body.reviewText;
  const reviewRating = req.body.reviewRating;
  db.saveReview(title, username, reviewText, reviewRating, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      console.log('saved review');
    }
  });
  db.allReviews((err, doc) => {
    if (err) {
      console.log(err);
    } else {
      doc.forEach((review) => {
        const currentBook = {
          title: review.title,
          user: review.username,
          bookReview: review.reviewText,
          reviewRating: review.reviewRating,
        };
        if (review.title === title) { userReviews.push(currentBook); }
      });
      res.status(201);
      res.send(userReviews);
    }
  });
});

app.get('/singleReviews', (req, res) => {
  const title = req.query.title;
  const userReviews = [];
  db.allReviews((err, doc) => {
    if (err) {
      console.log(err);
    } else {
      doc.forEach((review) => {
        const currentBook = {
          title: review.title,
          user: review.username,
          bookReview: review.reviewText,
          reviewRating: review.reviewRating,
        };
        if (review.title === title) { userReviews.push(currentBook); }
      });
      res.send(userReviews);
    }
  });
});

app.get('/genreTest', (req, res) => {
  const query = req.query.genre;
  helpers.googleGenre(query)
    .then((response) => {
      const booksByGenre = response.data.items;
      const highRated = [];
      booksByGenre.forEach((book) => {
        if (+book.volumeInfo.averageRating > 2) {
          const highRatedBook = {
            title: book.volumeInfo.title,
            rating: +book.volumeInfo.averageRating,
            coverImage: book.volumeInfo.imageLinks.thumbnail,
            longDescript: book.volumeInfo.description,
          };
          highRated.push(highRatedBook);
        }
      });
      const length = booksByGenre.length;

      res.send({ highRated, length });
    });
});


// res.data.items[0] will access the first book on search of a title. with a proper title this works well.
app.get('/googleData', (req, response) => {
  const query = req.query.title;
  helpers.googleBooks(query)
    .then((res) => {
      const info = res.data.items[0].volumeInfo;
      const title = info.title;
      const longDescript = info.description; // full description
      const genres = info.categories; // array of genre strings, often 1 element
      const rating = +info.averageRating || 2.75;
      const coverImage = info.imageLinks.thumbnail; // url to large format thumbnail
      const ISBN10 = info.industryIdentifiers[0].identifier;
      const ISBN13 = info.industryIdentifiers[1].identifier;
      helpers.libThingISBN(ISBN10)
        .then((libThings) => {
          const libThingRating = (+(libThings.data.split('<rating>')[1].slice(0, 1))) / 2;
          helpers.goodReadsData(query)
            .then((goodReads) => {
              const gReadsRating = +goodReads.data.split('<average_rating>')[1].slice(0, 4);
              const aggregateRating = Math.round((+rating + +libThingRating + +gReadsRating + 3) / 4);
              db.saveBook({
                title,
                longDescript,
                ISBN13,
                aggregateRating,
                rating,
                libThingRating,
                gReadsRating,
                userRating: 3.0,
                coverImage,
              }, (err) => {
                if (err) { console.log(err); } else {
                  console.log('success');
                }
              });
              response.json({
                title,
                longDescript,
                genres,
                rating,
                coverImage,
                libThingRating,
                gReadsRating,
                userRating: 2.75,
                aggregateRating,
                ISBN13,
              });
            });
        });
    })
    .catch(err => console.log(err));
});

app.get('/openLibLink', (req, res) => {
  console.log(req.query, 'req.query');
  const ISBN = req.query.isbn;
  helpers.openLibrary(ISBN)
    .then((libLink) => {
      console.log(libLink.data, 'libLink.data');
      const readerLink = libLink.data[`ISBN:${ISBN}`].preview_url;
      console.log(readerLink, 'readerLink');
      res.send({ readerLink });
    });
});

// this is the average rating pulled from the HTML
// data.data.split('<average_rating>')[1].slice(0, 4)
// this will pull description from gooReads 90%
// data.data.split('<description>')[1].split(']')[0].slice(9)
app.get('/goodreads', (req, res) => {
  // let title = req.body.title;
  helpers.goodReadsData('Green Eggs and Ham')
    .then((data) => {
      console.log(data.data.split('<average_rating>')[1].slice(0, 4));
      console.log(data.data.split('<description>')[1].split(']')[0].slice(9));
    })
    .catch(err => console.log(err));
});


// Set Port, hosting services will look for process.env.PORT
app.set('port', (process.env.PORT || 3000));

// start the server
app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});
