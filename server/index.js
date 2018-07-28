/* eslint-disable prefer-destructuring */

const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const path = require('path');
const bodyParser = require('body-parser');
const helpers = require('./helpers.js');
const db = require('../database/index.js');
// const items = require('');

const app = express();

// parse application/json
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../client/dist`));

// skeleton of patch request for updating favrite title list of user
app.patch('', (req, res) => {
});


app.get('/genreTest', (req, res) => {
  helpers.googleGenre('NonFiction')
    .then((response) => {
      const booksByGenre = response.data.items;
      const highRated = [];
      booksByGenre.forEach((book) => {
        if (+book.volumeInfo.averageRating > 2) {
          const highRatedBook = {
            title: book.volumeInfo.title,
            rating: +book.volumeInfo.averageRating,
            coverImage: book.volumeInfo.imageLinks.thumbnail,

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
      // console.log(res.data.items[0]);
      const info = res.data.items[0].volumeInfo;
      const title = info.title;
      const longDescript = info.description; // full description
      const genres = info.categories; // array of genre strings, often 1 element
      const rating = +info.averageRating || 2.75;
      // number rating can be whole number or number.number in the range of 0-5
      // const ageRating = info.maturityRating;// USELESS!!! naked lunch listed not mature
      const coverImage = info.imageLinks.thumbnail; // url to large format thumbnail
      //   const shortDescript = res.data.items[0].searchInfo.textSnippet;
      const ISBN10 = info.industryIdentifiers[0].identifier;
      const ISBN13 = info.industryIdentifiers[1].identifier;
      helpers.libThingISBN(ISBN10)
        .then((libThings) => {
          const libThingRating = (+(libThings.data.split('<rating>')[1].slice(0, 1))) / 2;
          helpers.goodReadsData(query)
            .then((goodReads) => {
              const gReadsRating = +goodReads.data.split('<average_rating>')[1].slice(0, 4);
              const aggregateRating = Math.round(+rating + +libThingRating + +gReadsRating) / 3;
              db.saveBook({
                title,
                longDescript,
                ISBN13,
                aggregateRating,
                rating,
                libThingRating,
                gReadsRating,
                userRating: 2.75,
                coverImage,
              }, (err, data) => {
                if (err) { console.log(err); } else {
                  console.log(data, 'success');
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
                aggregateRating,
              });
            });
        });
    })
    .catch(err => console.log(err));
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


app.listen(3000, () => {
  console.log('listening on port 3000!');
});
