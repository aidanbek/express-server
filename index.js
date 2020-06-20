require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('./helpers/logger');
const requestLogger = require('./helpers/requestLogger');
const compression = require('compression');
const expresshbs = require('express-handlebars');
const path = require('path');

app.engine('.hbs', expresshbs({
    extname: '.hbs',
    defaultLayout: 'main'
}));
app.set('view engine', '.hbs');

app.use(compression());
app.use(requestLogger);

app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/css', express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));

app.get('/', function (req, res) {
    res.render('home');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
