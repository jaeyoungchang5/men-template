/**
 * @fileoverview server.ts
 * This file handles the startup of the server
 */

/* import dependencies */
import express from 'express';
import body_parser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config(); // activate dotenv
import * as debuglog from './debuglog';

/* import env variables */
const backend_port = process.env.BACKEND_PORT;

/* startup server */
const app = express();

const routes = require('./routes/router'); // listen for router endpoints
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.use('/api', routes); // all api routes will follow 'https://localhost:PORT/api/ENDPOINTS' format

require('./config/database'); // call database config to connect to MongoDB

app.listen(backend_port, () => {
    debuglog.debuglog('LOG', 'server', `Server is listening on port ${backend_port}`);
});