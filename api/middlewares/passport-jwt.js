'use strict';

const passportJWT = require('passport-jwt');
const User = require('../models/user.model');
const Store = require('../models/store.model');

const error = require('../../helpers/api-error');

const passportConfig = require('../../config/passport.config').jwt;

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const useUserAuthenticationStragedy = (passport) => {
    let jwtOptions = {};
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
    jwtOptions.secretOrKey = passportConfig.secret;
    const stragedy = new JwtStrategy(jwtOptions, function(jwtPayload, next) {
        console.log('payload received', jwtPayload);

        User.findById(jwtPayload.id)
            .then((user) => {
                if (user) {
                    next(null, user);
                } else {
                    next(error.unauthorizedError, false);
                }
            }).catch((err) => {
                next(err, false);
            });
    });

    passport.use('useAuthStragedy', stragedy);
};

const useStoreAuthenticationStragedy = (passport) => {
    let jwtOptions = {};
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
    jwtOptions.secretOrKey = passportConfig.secret;
    const stragedy = new JwtStrategy(jwtOptions, function(jwtPayload, next) {
        console.log('payload received', jwtPayload);

        Store.findById(jwtPayload.id)
            .then((store) => {
                if (store) {
                    next(null, store);
                } else {
                    next(error.unauthorizedError, false);
                }
            }).catch((err) => {
                next(err, false);
            });
    });

    passport.use('storeAuthStragedy', stragedy);
};

module.exports = {
    useUserAuthenticationStragedy,
    useStoreAuthenticationStragedy
};
