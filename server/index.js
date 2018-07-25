const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helpers = require('./helpers.js')

// const items = require('');

const app = express();


app.use(express.static(__dirname + '/../client/dist'));
 
// res.data.items[0] will access the first book on search of a title. with a proper title this works well.
app.get('/googleData', (req, res) => {
    helpers.googleBooks('Naked Lunch')
    .then((res) => {
        // console.log(res.data.items[0]);
        const info = res.data.items[0].volumeInfo;
        const longDescript = info.description; //full description
        const genres = info.categories; // array of genre strings, often 1 element 
        const rating = +info.averageRating; //number rating can be whole number or number.number in the range of 0-5
        // const ageRating = info.maturityRating;// USELESS!!! naked lunch listed not mature
        const coverImage = info.imageLinks.thumbnail; //url to large format thumbnail
        const shortDescript = res.data.items[0].searchInfo.textSnippet
        const ISBN10 = info.industryIdentifiers[0].identifier
        const ISBN13 = info.industryIdentifiers[1].identifier
        console.log(ISBN10, ISBN13)
    })
    .catch((err) => console.log(err))

});

// this is the average rating pulled from the HTML data.data.split('<average_rating>')[1].slice(0, 4)
// this will pull description from gooReads 90% data.data.split('<description>')[1].split(']')[0].slice(9)
app.get('/goodreads', (req, res) => {
    // let title = req.body.title;
    helpers.goodReadsData('Green Eggs and Ham')
    .then(data => {
        console.log(data.data.split('<average_rating>')[1].slice(0, 4))
        console.log(data.data.split('<description>')[1].split(']')[0].slice(9))
    })
    .catch(err => console.log(err));
   
});

app.listen(3000, () => {
    console.log('listening on port 3000!');
});