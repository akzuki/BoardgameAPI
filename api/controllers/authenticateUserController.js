'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const responseHandler = require('../../helpers/responseHandler');
const passportConfig = require('../../config/passport.config');

const handleFacebookLogin = (req, res, next) => {
    const facebookId = req.body.facebookId;
    const token = req.body.token;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    User.findOne({
        'facebook.id': facebookId
    }).then((existingUser) => {
        if (existingUser) {
            return existingUser;
            // const payload = {
            //     id: existingUser.id
            // };
            // const token = jwt.sign(payload, passportConfig.jwt.secret);
            // res.json(responseHandler.successResponse(token));
        } else {
            const newUser = new User();
            newUser.facebook.id = facebookId;
            newUser.facebook.token = token;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.email = email;
            return User.create(newUser);
        }
    }).then((savedUser) => {
        const payload = {
            id: savedUser.id
        };
        const token = jwt.sign(payload, passportConfig.jwt.secret);
        res.json(responseHandler.successResponse(token));
    }).catch((err) => next(err));
};

const handleLoginCallback = (req, res, next) => {
    const payload = {
        id: req.user.id
    };
    let token = jwt.sign(payload, passportConfig.jwt.secret);
    res.json(responseHandler.successResponse(token));
};

module.exports = {
    handleFacebookLogin,
    handleLoginCallback
};
