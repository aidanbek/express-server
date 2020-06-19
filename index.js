require('dotenv').config();
const express = require('express');
const logger = require('./helpers/logger');
const requestLogger= require('./helpers/requestLogger');
const compression = require('compression');
const app = express();

app.use(compression());
app.use(requestLogger);

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});