const databaseName = 'heroku_hnndcxg4';

module.exports = {
    connectionUrl: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${databaseName}`
};
