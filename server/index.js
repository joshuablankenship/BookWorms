const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helpers = require('./helpers.js')

// const items = require('../database-mongo');

const app = express();


 app.use(express.static(__dirname + '/../client/dist'));


app.get('/title', (req, res) => {
    // let title = req.body.title;
    helpers.goodReadsData('Where The Wild Things Are')
    .then(data => console.log(data.data))
    .catch(err => console.log(err));
   
});

app.listen(3000, () => {
    console.log('listening on port 3000!');
});