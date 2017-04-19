'use strict';

const databaseName = 'boardgame';

module.exports = {
    connectionUrl: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${databaseName}`
};
