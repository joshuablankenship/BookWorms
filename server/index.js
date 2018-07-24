const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


// const items = require('../database-mongo');

const app = express();


 app.use(express.static(__dirname + '/../client/dist'));




app.listen(3000, () => {
    console.log('listening on port 3000!');
});