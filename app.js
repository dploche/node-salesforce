const express = require('express');
const app = express();
const path = require('path');
const authorizeSF = require('./middleware/authorize-sf.js');
const postLead = require('./middleware/postLead.js');
const postCase = require('./middleware/postCase.js');
const handlePost = require('./middleware/postHandlers.js');

app.use(express.static('./public'));

app.use(express.json());

// Home Page

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './public/index.html'));
});

// Lead Get and Post

app.get('/lead', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './public/lead.html'));
});

app.post('/lead', authorizeSF, (req, res) => handlePost(postLead, 'Created Lead', req, res));
// Case Get and Post

app.get('/case', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './public/case.html'));
});

app.post('/case', authorizeSF, (req, res) => handlePost(postCase, 'Created Case', req, res));

app.listen(5500, (req, res) => {
    console.log('Listening on Port 5500...');
});