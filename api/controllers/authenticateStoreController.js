'use strict';

const jwt = require('jsonwebtoken');
const Store = require('../models/store.model');
const responseHandler = require('../../helpers/responseHandler');
const passportConfig = require('../../config/passport.config');
const error = require('../../helpers/api-error');

const createStore = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    const store = new Store({
        name: name,
        email: email,
        password: password,
        address: address
    });
    Store.findOne({
        'email': email
    }).then((existingStore) => {
        if (existingStore) {
            throw error.existingEmailError;
        } else {
            return Store.create(store);
        }
    }).then((savedStore) => {
        const payload = {
            id: savedStore.id
        };
        const token = jwt.sign(payload, passportConfig.jwt.secret);
        res.json(responseHandler.successResponse(token));
    }).catch((err) => next(err));
};

const loginStore = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    Store.findOne({
        'email': email
    }).then((existingStore) => {
        if (existingStore) {
            return new Promise(function(resolve, reject) {
                existingStore.validatePassword(password)
                    .then((isMatch) => resolve({
                        isMatch: isMatch,
                        store: existingStore
                    })).catch((err) => reject(err));
            });
        } else {
            throw error.badRequestError;
        }
    }).then((response) => {
        if (!response.isMatch) {
            throw (error.badRequestError);
        } else {
            const payload = {
                id: response.store.id
            };
            let token = jwt.sign(payload, passportConfig.jwt.secret);
            res.json(responseHandler.successResponse(token));
        }
    }).catch((err) => next(err));
};

module.exports = {
    createStore,
    loginStore
}; ;
