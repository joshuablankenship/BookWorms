const axios = require('axios');
// const config = require('../config.js');
// const goodReads = config.goodReads

// Finally got a response thats useable from good reads!!! format below
//  https://www.goodreads.com/book/title.xml?&key=API_KEY&title=where+the+wild+things+are
const goodReadsData = (title) => {
    let formattedTitle = title.split(' ').join('+');
    // return axios.get(`https://www.goodreads.com/book/title.xml?&key=${goodReads}&title=${formattedTitle}`)
}

const googleBooks = (title) => {
    //  let formattedTitle = title.split(' ').join('_');
     return axios.get(`https://www.googleapis.com/books/v1/volumes?q=where_the_wild_things_are&key=AIzaSyCi1Fgi8K1bnX8CVNO1ZSs0w9JPzS1NXbg`)
}

module.exports = {
    goodReadsData,
    googleBooks
}