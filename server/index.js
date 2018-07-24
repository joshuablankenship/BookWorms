const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helpers = require('./helpers.js')

// const items = require('');

const app = express();


 app.use(express.static(__dirname + '/../client/dist'));

// this is the average rating pulled from the HTML data.data.split('<average_rating>')[1].slice(0, 4)
// this will pull description from gooReads 90% data.data.split('<description>')[1].split(']')[0].slice(9)
app.get('/title', (req, res) => {
    // let title = req.body.title;
    // helpers.goodReadsData('Green Eggs and Ham')
    // .then(data => {
    //     console.log(data.data.split('<average_rating>')[1].slice(0, 4))
    //     console.log(data.data.split('<description>')[1].split(']')[0].slice(9))
    // })
    // .catch(err => console.log(err));
   
});

app.listen(3000, () => {
    console.log('listening on port 3000!');
});