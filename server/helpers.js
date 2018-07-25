const axios = require('axios');
const config = require('../config.js');
const goodReads = config.goodReads
const google = config.google

// Finally got a response thats useable from good reads!!! format below
//  https://www.goodreads.com/book/title.xml?&key=API_KEY&title=where+the+wild+things+are
const goodReadsData = (title) => {
    let formattedTitle = title.split(' ').join('+');
    return axios.get(`https://www.goodreads.com/book/title.xml?&key=${goodReads}&title=${formattedTitle}`)
}

const googleBooks = (title) => {
     let format = title.split(' ').join('_');
     return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${format}&key=${google}`)
}

module.exports = {
    goodReadsData,
    googleBooks
}