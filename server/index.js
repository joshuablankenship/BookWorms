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

// res.data.items[0] will access the first book on search of a title
// with a proper title this works well.
app.get('/genreTest', (req, res) => {
  helpers.googleGenre('NonFiction')
    .then((response) => {
      const booksByGenre = response.data.items;
      const highRated = [];
      booksByGenre.forEach((book) => {
        if (+book.volumeInfo.averageRating > 2) {
          let highRatedBook = {
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


app.get('/googleData', (req, response) => {
  helpers.googleBooks('The Lord Of The Rings: The Two Towers')
    .then((res) => {
      // console.log(res.data.items[0]);
      const info = res.data.items[0].volumeInfo;
      const longDescript = info.description; // full description
      const genres = info.categories; // array of genre strings, often 1 element
      const rating = +info.averageRating;
      // number rating can be whole number or number.number in the range of 0-5
      // const ageRating = info.maturityRating;// USELESS!!! naked lunch listed not mature
      const coverImage = info.imageLinks.thumbnail; // url to large format thumbnail
      //   const shortDescript = res.data.items[0].searchInfo.textSnippet;
      const ISBN10 = info.industryIdentifiers[0].identifier;
      const ISBN13 = info.industryIdentifiers[1].identifier;
      helpers.libThingISBN(ISBN10)
        .then((libThings) => {
          const libThingRating = +(libThings.data.split('<rating>')[1].slice(0, 1));
          response.json({
            longDescript,
            genres,
            rating,
            coverImage,
            ISBN10,
            ISBN13,
            libThingRating,
          });
        });
    })
    .catch(err => console.log(err));
});

// res.data.items[0] will access the first book on search of a title. with a proper title this works well.
app.post('/googleData', (req, response) => {
  const query = req.body.query;
  helpers.googleBooks(query)
    .then((res) => {
      // console.log(res.data.items[0], 'res.data.items[0]');
      const info = res.data.items[0].volumeInfo;
      const title = info.title;
      const longDescript = info.description; // full description
      const genres = info.categories; // array of genre strings, often 1 element
      const rating = +info.averageRating; // number rating can be whole number or number.number in the range of 0-5
      // const ageRating = info.maturityRating;// USELESS!!! naked lunch listed not mature
      const coverImage = info.imageLinks.thumbnail; // url to large format thumbnail
      // const shortDescript = res.data.items[0].searchInfo.textSnippet
      const ISBN10 = info.industryIdentifiers[0].identifier;
      const ISBN13 = info.industryIdentifiers[1].identifier;
      // console.log(longDescript, genres, rating, coverImage);
      response.json({
        title, longDescript, genres, rating, coverImage,
      });
      // response.send({ title, longDescript, genres, rating, coverImage });
    })
    .catch(err => console.error(err));
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
