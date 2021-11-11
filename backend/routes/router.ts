/**
 * @fileoverview router.js
 * This file provides all the API endpoint routes for the server.
 */

/* import dependencies */
import express from 'express';
const router = express.Router(); // activate router
import { debuglog } from '../helpers/debuglog';

/* link controllers */
//import * as usersCtrl from '../controllers/user.controller';
import * as usersCtrl from '../controllers/user.controller';

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
router.put('/user/password/:username', usersCtrl.putUserPassword);

export {
    router
};