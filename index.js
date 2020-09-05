require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const logger = require('./helpers/logger');
const requestLogger = require('./helpers/requestLogger');
const compression = require('compression');
const expresshbs = require('express-handlebars');
const path = require('path');
const homeRouter = require('./routes/home');
const aboutRouter = require('./routes/about');

// app configuration
app.engine('.hbs', expresshbs({
    extname: '.hbs',
    defaultLayout: 'main'
}));
app.set('view engine', '.hbs');
app.use(compression());
app.use(requestLogger);

// app static files
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/css', express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));

// app routes
app.use('/', homeRouter);
app.use('/about', aboutRouter);

app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}!`);
});
