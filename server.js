'use strict';
const mongoose = require('mongoose');

const db = require('./config/db.config');
const app = require('./config/express.config');
const debug = require('debug')('boardgames-api:server');

mongoose.Promise = global.Promise;

mongoose.connect(db.connectionUrl)
    .then(() => {
        console.log('Connected successfully.');
        const listener = app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on port ${listener.address().port}`);
        });
    }).catch(err => {
        console.log('Cannot connect to database ', err);
    });
