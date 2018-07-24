const axios = require('axios');
const config = require('./config.js');
const libThing = config.libThing
const goodReads = config.goodReads

// Finally got a response thats useable from good reads!!! format below
//  https://www.goodreads.com/book/title.xml?&key=API_KEY&title=where+the+wild+things+are
const goodReadsData = (title) => {
    let formattedTitle = title.split(' ').join('+');
    return axios.get(`https://www.goodreads.com/book/title.xml?&${goodReads}&${formattedTitle}`)
}