'use strict';

const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user.model');

const passportConfig = require('../../config/passport.config').facebookAuth;

module.exports = function(passport) {
    const strategy = new FacebookStrategy({
            clientID: passportConfig.clientID,
            clientSecret: passportConfig.clientSecret,
            callbackURL: passportConfig.callbackURL,
            profileFields: ['id', 'emails', 'name']
        },

        function(token, refreshToken, profile, done) {
            console.log(profile);
            process.nextTick(function() {
                User.findOne({
                    'facebook.id': profile.id
                }).then((user) => {
                    if (user) {
                        done(null, user);
                    } else {
                        const newUser = new User();
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = token;
                        newUser.firstName = profile.name.givenName;
                        newUser.lastName = profile.name.familyName;
                        newUser.email = profile.emails[0].value;
                        return User.create(newUser);
                    }
                }).then((savedUser) => {
                    done(null, savedUser);
                }).catch((err) => {
                    done(err);
                });
            });
        });

    passport.use(strategy);
};
