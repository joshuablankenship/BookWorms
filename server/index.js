const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


// const items = require('../database-mongo');

const app = express();


 app.use(express.static(__dirname + '/../client/dist'));


app.get('/items', (req, res) => {
    items.selectAll((err, data) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.json(data);
        }
    });
});

app.listen(3000, () => {
    console.log('listening on port 3000!');
});