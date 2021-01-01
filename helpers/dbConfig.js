const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const dbConfig = {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: 'mysql',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    dialectOptions: {
        dateStrings: true,
        typeCast: true
    },
    timezone: '+06:00'
}

module.exports = dbConfig;