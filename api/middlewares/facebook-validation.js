'use strict';

const request = require('request');
const facebookConfig = require('../../config/passport.config').facebookAuth;
const error = require('../../helpers/api-error');

const validateFacebookAccessToken = (req, res, next) => {
    const propertiesObject = {
        input_token: req.body.token,
        access_token: facebookConfig.access_token
    };
    const url = 'https://graph.facebook.com/debug_token';
    request({
        url: url,
        qs: propertiesObject
    }, function(err, response, body) {
        if (err) {
            return next(err);
        }
        const bodyJSON = JSON.parse(body);
        const app_id = bodyJSON.data.app_id;
        const user_id = bodyJSON.data.user_id;
        if ((app_id === facebookConfig.clientID) && (user_id === req.body.facebookId)) {
            next();
        } else {
            next(error.badRequestError);
        }
    });
};

module.exports = {
    validateFacebookAccessToken
};
