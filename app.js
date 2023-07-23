const express = require('express');
const app = express();

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.status(200).send('./public/index.html');
});

app.listen(5500, (req, res) => {
    console.log('Listening on Port 5500...');
});