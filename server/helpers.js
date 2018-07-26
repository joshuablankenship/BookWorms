/* eslint-disable prefer-destructuring */
const axios = require('axios');
const config = require('../config.js');

const goodReads = config.goodReads;
const google = config.google;
const libThing = config.libThing;

// Finally got a response thats useable from good reads!!! format below
//  https://www.goodreads.com/book/title.xml?&key=API_KEY&title=where+the+wild+things+are
const goodReadsData = (title) => {
  const formattedTitle = title.split(' ').join('+');
  return axios.get(`https://www.goodreads.com/book/title.xml?&key=${goodReads}&title=${formattedTitle}`);
};

const googleBooks = (title) => {
  const format = title.split(' ').join('_');
  return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${format}&key=${google}`);
};

const googleGenre = genre => axios.get(`https://www.googleapis.com/books/v1/volumes?q=${genre}&key=${google}&maxResults=40`);

const libThingISBN = ISBN => axios.get(`http://www.librarything.com/services/rest/1.1/?method=librarything.ck.getwork&isbn=${ISBN}&apikey=${libThing}`);

module.exports = {
  goodReadsData,
  googleBooks,
  libThingISBN,
  googleGenre,
};
