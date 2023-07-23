const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const authorizeSF = require('./middleware/authorize-sf.js');

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({ extended: true }));

// Home Page

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './public/index.html'));
});

// Lead Get and Post

app.get('/lead', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './public/lead.html'));
});

app.post('/lead', (req, res) => {
    res.status(201).send('Created Lead');
});
// Case Get and Post

app.get('/case', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './public/case.html'));
});

// Authorization test

app.post('/auth', authorizeSF, (req, res) => {
    if (req.authorization && req.authorization.success) {
        console.log('Access Token:', req.authorization.accessToken);
        res.status(201).send('Successful Authorization');
    } else {
        console.log('Authorization Error:', req.authorization.error);
        res.status(500).send(req.authorization.message);
    }
});

app.listen(5500, (req, res) => {
    console.log('Listening on Port 5500...');
    //console.log(consumerKey, consumerSecret);
});