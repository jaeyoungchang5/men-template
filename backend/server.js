/**
 * @fileoverview server.js
 * This file handles the startup of the server
 */

/* import dependencies */
const express = require('express');
const body_parser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config(); // activate dotenv
const debuglog = require('./debuglog');

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
    debuglog('LOG', 'server', `Server is listening on port ${backend_port}`);
});