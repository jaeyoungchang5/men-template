/**
 * @fileoverview user.controller.js
 * This file contains all the controller functions for the user collection.
 */

/* import dependencies */
const debuglog = require('../debuglog');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports = {
    signup,
    login,
    getUserInfo,
    putUserLocation,
    getUserLocation,
    putUserInfo
};

/**
 * @function signup : POST request to signup a new user
 * req body: {"firstName": "___", "lastName": "___", "username": "___", etc.}
 * res body: {result: 'success', message: 'Signup successful'}
 */
function signup(req, res){
    let tempUsername = req.body.username;
    req.body.username = tempUsername.toLowerCase();

    const user = new User(req.body);
    user.save()
    .then(newUser => {
        debuglog('LOG', 'user controller - signup', 'signed up user');
        const token = createToken(newUser);
        res.status(201).json({result: 'success', message: 'Signup successful', token: token});
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - signup', err);
        res.status(400).json(err);
    });   
}

/**
 * @function login : POST request to login an existing user
 * req endpoint: '/api/login'
 * req body: {"username": "___", "password": "___"}
 * res body:
 *      if login is successful,
 *          {result: 'success', message: 'Login successful'}
 *      if login is unsuccessful (incorrect pw), 
 *          {result: 'error', message: 'Incorrect password'}
 */
function login(req, res){
    debuglog('LOG', 'user controller - login', 'attempting login');
    
    User.findOne({username: req.body.netID.toLowerCase()})
    .then(foundUser => {
        if (!foundUser){
            debuglog('ERROR', 'user controller - login', 'user username not found');
            res.status(404).json({result: 'error', message: 'Username not found'});
            return;
        }

        // check given password against password in db
        foundUser.checkPassword(req.body.password, (err,result) => {
            if (result) { // correct password
                debuglog('LOG', 'user controller - login', 'found user, correct password');
                const token = createToken(foundUser);
                res.header('auth-token', token);
                res.status(200).json({result: 'success', message: 'Login successful', token: token});
            } else { // incorrect password
                debuglog('LOG', 'user controller - login', 'found user, incorrect password');
                res.status(400).json({result: 'error', message: 'Incorrect password'});
            }
        });
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - login', err);
        res.status(401).json(err);
        return;
    });
}

/**
 * @function createToken : creates a jwt token for user
 * @param {*} user 
 * @returns String : jwt token
 */
function createToken(user){
    return jwt.sign({ user: { username: user.username, firstName: user.firstName, lastName: user.lastName } }, process.env.ACCESS_TOKEN_SECRET);
}

/**
 * @function getUserInfo : GET request to get info for one user
 * @param {String} req.params.username : username 
 * @param {*} res : user's info
 */
function getUserInfo(req, res){
    let tempUsername = req.params.username;
    req.params.username = tempUsername.toLowerCase();

    User.findOne(req.params)
    .then(userData => {
        if (userData){
            debuglog('LOG', 'user controller - getUserInfo', 'got user info');
            res.status(200).json(userData);
        } else {
            debuglog('LOG', 'user controller - getUserInfo', 'user not found');
            res.status(200).json({result: 'error', message: 'User not found'});
        }
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - getUserInfo', err);
        res.status(401).json(err);
        return;
    })
}

/**
 * @function putUserInfo : PUT request to update user info
 * @param {String} req.params.username : username 
 */
function putUserInfo(req, res){
    let tempUsername = req.params.username;
    req.params.username = tempUsername.toLowerCase();

    User.updateOne(req.params, {$set: req.body})
    .then(dbResponse => {
        if (dbResponse['n'] == 1){
            debuglog('LOG', 'user controller - updateUserInfo', 'updated user info');
            res.status(200).json({result: 'success', message: 'User update successful'});
        } else if (dbResponse['n'] == 0) {
            debuglog('LOG', 'user controller - updateUserInfo', 'username not found');
            res.status(200).json({ result: 'error', message: 'User not found' });
        }
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - updateUserInfo', err);
        res.status(500).json(err.message);
    });
}

/**
 * @function putUserLocation : PUT request to update user location
 * @param {String} req.params.username : username
 * @param {*} res 
 */
function putUserLocation(req, res){
    let tempUsername = req.params.username;
    req.params.username = tempUsername.toLowerCase();

    User.updateOne(req.params, {$set: req.body})
    .then(dbResponse => {
        if (dbResponse['n'] == 0){
            debuglog('ERROR', 'user controller - putUserLocation', 'could not find user');
            res.status(404).json({ result: 'error', message: 'Username not found' });
            return;
        }
        // debuglog('LOG', 'user controller - putUserLocation', 'updated user location');
        res.status(200).json({ result: 'success', message: 'User location update successful' });
        
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - putUserLocation', err);
        res.status(500).json(err.message);
    });
}

/**
 * @function getUserLocation : GET request to get user location
 * @param {String} req.params.username : username
 * @param {*} res 
 */
function getUserLocation(req, res){
    let tempUsername = req.params.username;
    req.params.username = tempUsername.toLowerCase();

    User.find(req.params) // req.params: {"username": "___"}
    .then(dbResponse => {
        debuglog('LOG', 'user controller - getUserLocation', 'got user location');
        res.status(200).json(dbResponse[0]["coordinates"]);
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - getUserLocation', err);
        res.status(401).json(err);
        return;
    })
}