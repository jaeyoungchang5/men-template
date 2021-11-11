/**
 * @fileoverview user.controller.js
 * This file contains all the controller functions for the user collection.
 */

/* import dependencies */
import { debuglog } from '../debuglog';
import { User } from '../models/user.model';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

/**
 * @function signup : POST request to signup a new user
 * req body: {"firstName": "___", "lastName": "___", "username": "___", "password": "___"}
 * res body: {result: 'success', message: 'Signup successful'}
 */
export function signup(req: Request, res: Response){
    const body = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username.toLowerCase(),
        password: req.body.password,
    }

    const user = new User(body);
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
export function login(req: Request, res: Response){
    const body = {
        username: req.body.username.toLowerCase(),
        password: req.body.password,
    }

    debuglog('LOG', 'user controller - login', 'attempting login');
    User.findOne({username: body.username})
    .then(foundUser => {
        if (!foundUser){
            debuglog('ERROR', 'user controller - login', 'user username not found');
            res.status(404).json({result: 'error', message: 'Username not found'});
            return;
        }

        // check given password against password in db
        if (foundUser.checkPassword(body.password)){
            debuglog('LOG', 'user controller - login', 'found user, correct password');
            const token = createToken(foundUser);
            res.header('auth-token', token);
            res.status(200).json({result: 'success', message: 'Login successful', token: token});
        } else {
            debuglog('LOG', 'user controller - login', 'found user, incorrect password');
            res.status(400).json({result: 'error', message: 'Incorrect password'});
        }
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
function createToken(user: any) {
    const body = {
        username: user.username, 
        firstName: user.firstName, 
        lastName: user.lastName 
    }

    return jwt.sign({ user: { body } }, process.env.ACCESS_TOKEN_SECRET);
}

/**
 * @function getUserInfo : GET request to get info for one user
 * @param {String} req.params.username : username 
 * @param {*} res : user's info
 */
export function getUserInfo(req: Request, res: Response){
    const body = {
        username: req.params.username.toLowerCase()
    }

    User.findOne({username: body.username})
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
 * @function putUserInfo : PUT request to update user info (will not update password)
 * @param {String} req.params.username : username
 */
export function putUserInfo(req: Request, res: Response){
    let body: {[key:string]: any} = {};
    let key: string
    for (key in req.body) {
        if (req.body[key] == undefined || key == 'password') {
            continue;
        }
        body[key] = req.body[key];
    }

    if (Object.keys(body).length == 0) {
        console.log("empty");

        debuglog('LOG', 'user controller - updateUserInfo', 'nothing to update');
        res.status(200).json({ result: 'success', message: 'Nothing to update' });
        return;
    }

    User.updateOne(req.params, {$set: body})
    .then(dbResponse => {
        if (dbResponse.modifiedCount == 1){
            debuglog('LOG', 'user controller - updateUserInfo', 'updated user info');
            res.status(200).json({result: 'success', message: 'User update successful'});
        } else if (dbResponse.matchedCount == 0) {
            debuglog('LOG', 'user controller - updateUserInfo', 'username not found');
            res.status(200).json({ result: 'error', message: 'username not found' });
        }else if (dbResponse.modifiedCount == 0) {
            debuglog('LOG', 'user controller - updateUserInfo', 'no info updated');
            res.status(200).json({ result: 'error', message: 'no info updated' });
        }
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - updateUserInfo', err);
        res.status(500).json(err.message);
    });
}

/**
 * @function putUserPassword : PUT request to update user password
 * @param {String} req.params.username : username
 */
export function putUserPassword(req: Request, res: Response) {
    const body = {
        "password": req.body.password
    };

    User.findOne({username: req.params.username})
    .then(foundUser => {
        if (!foundUser){
            debuglog('ERROR', 'user controller - login', 'user username not found');
            res.status(404).json({result: 'error', message: 'Username not found'});
            return;
        }

        debuglog('LOG', 'user controller - put user password', 'attempting to update password');
        foundUser.password = body.password;
        foundUser.save()
        .then(newUser => {
            debuglog('LOG', 'user controller - put user password', 'updated password');
            const token = createToken(newUser);
            res.status(201).json({result: 'success', message: 'Update password successful', token: token});
        }).catch(err => { // catch errors
            debuglog('ERROR', 'user controller - put user password', err);
            res.status(400).json(err);
        });

    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - login', err);
        res.status(401).json(err);
        return;
    });


}