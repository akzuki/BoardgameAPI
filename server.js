'use strict';
const mongoose = require('mongoose');

const db = require('./config/db.config');
const app = require('./config/express.config');
const debug = require('debug')('boardgames-api:server');

mongoose.Promise = global.Promise;

mongoose.connect(db.connectionUrl).then(() => {
    console.log('Connected successfully.');
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}, err => {
    console.log('Connection to db failed: ' + err);
    throw (err);
});
