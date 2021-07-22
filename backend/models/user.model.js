/**
 * @fileoverview user.model.js
 * This file is the model (schema) file for the user collection.
 * 
 * @todo
 * 1. make sure password is encrypted when user is updated
 */

/* import dependencies */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // use bcrypt for password encryption

/* import global options */
const options = require('../options.json');
const privacyOptions = options['User.privacyOptions'];

/* user schema structure */
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    privacy: {
        type: String,
        enum: privacyOptions,
        required: true
    },
    coordinates: {
        latitude: {
            type: Number,
            default: 41.70307706874321
        },
        longitude: {
            type: Number,
            default: -86.23898524167699
        }
    }
});

/**
 * @method pre('save') : user method for encrypting password before saving the user
 */
userSchema.pre('save', function(next){
    const user = this;

    bcrypt.hash(user.password, process.env.SALT, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
})

/**
 * @method checkPassword : check password using bcrypt compare when user attempts login
 * @param {String} password : password given by user when trying to login 
 * @param {*} params 
 */
userSchema.methods.checkPassword = function(password, params) {
    bcrypt.compare(password, this.password, params);
}

module.exports = mongoose.model('user', userSchema);