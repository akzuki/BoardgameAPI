'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    facebook: {
        id: {
            type: String,
            required: true,
            unique: true
        },
        token: {
            type: String
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.statics = {
    create(user) {
        return user.save();
    }
};

module.exports = mongoose.model('User', UserSchema);
