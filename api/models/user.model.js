const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function(next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods = {
    validatePassword(password) {
        return new Promise(function(resolve, reject) {
            bcrypt.compare(password, this.password, function(err, isMatch) {
                return err ? reject(err) : resolve(isMatch);
            });
        });
        // return bcrypt.compare(password, this.password);
    }
};

UserSchema.statics = {
    create(user) {
        return user.save();
    }
};

module.exports = mongoose.model('User', UserSchema);
