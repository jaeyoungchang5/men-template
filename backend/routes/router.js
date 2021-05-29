/**
 * @fileoverview router.js
 * This file provides all the API endpoint routes for the server.
 */

/* import dependencies */
const express = require('express');
const router = express.Router(); // activate router
const debuglog = require('../debuglog');

/* link controllers */
const usersCtrl = require('../controllers/user.controller');

/* ROUTE ENDPOINTS */

// test
router.get('/test', (req, res) => {
    debuglog('LOG', 'router - test', 'Router Test Success');
    res.json({'result': 'router test success'});
});

// users
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/user/info/:username', usersCtrl.getUserInfo);
router.put('/user/info/:username', usersCtrl.putUserInfo);
router.put('/user/location/:username', usersCtrl.putUserLocation);
router.get('/user/location/:username', usersCtrl.getUserLocation);

module.exports = router;
