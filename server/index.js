const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helpers = require('./helpers.js')

// const items = require('../database-mongo');

const app = express();


<<<<<<< HEAD
 app.use(express.static(__dirname + '/../client/dist'));

// this is the average rating pulled from the HTML data.data.split('<average_rating>')[1].slice(0, 4)
// this will pull description from gooReads 90% data.data.split('<description>')[1].split(']')[0].slice(9)
app.get('/title', (req, res) => {
    // let title = req.body.title;
    helpers.goodReadsData('Green Eggs and Ham')
    .then(data => {
        console.log(data.data.split('<average_rating>')[1].slice(0, 4))
        console.log(data.data.split('<description>')[1].split(']')[0].slice(9))
    })
    .catch(err => console.log(err));
   
});
=======
app.use(express.static(__dirname + '/../client/dist'));


// app.get('/items', (req, res) => {
//     items.selectAll((err, data) => {
//         if (err) {
//             res.sendStatus(500);
//         } else {
//             res.json(data);
//         }
//     });
// });
>>>>>>> 7cc4107cc79881514d08b8a08c2cb1c29400d9bc

app.listen(3000, () => {
    console.log('listening on port 3000!');
});