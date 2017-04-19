'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const StoreSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

StoreSchema.pre('save', function(next) {
    const store = this;

    // only hash the password if it has been modified (or is new)
    if (!store.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR)
        .then((salt) => {
            return bcrypt.hash(store.password, salt);
        }).then((hash) => {
            store.password = hash;
            next();
        }).catch((err) => {
            next(err);
        });
});

StoreSchema.methods = {
    validatePassword(password) {
        return bcrypt.compare(password, this.password);
    }
};

StoreSchema.statics = {
    create(store) {
        return store.save();
    }
};

module.exports = mongoose.model('Store', StoreSchema);
