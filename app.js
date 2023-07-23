const express = require('express');
const app = express();
const path = require('path');
const authorizeSF = require('./middleware/authorize-sf.js');
const postLead = require('./middleware/postLead.js');

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

app.post('/lead', authorizeSF, async (req, res) => {
    if (req.authorization && req.authorization.success) {
        const leadData = req.body;
        console.log('Lead data in app.js:', leadData);
        const accessToken = req.authorization.accessToken;
        const instanceUrl = req.authorization.instanceUrl
        const postLeadResult = await postLead(leadData, accessToken, instanceUrl);
        if (postLeadResult.success) {
            console.log(postLeadResult.data);
            res.status(201).send('Created Lead');
        } else {
            console.log(postLeadResult.message);
            res.status(500).send(postLeadResult.message);
        }
    } else {
        console.log('Authorization Error:', req.authorization.error);
        res.status(500).send(req.authorization.message);
    }
});
// Case Get and Post

app.get('/case', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './public/case.html'));
});

// Authorization test

app.post('/auth', authorizeSF, (req, res) => {
    if (req.authorization && req.authorization.success) {
        console.log('Instance URL:', req.authorization.instanceUrl);
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