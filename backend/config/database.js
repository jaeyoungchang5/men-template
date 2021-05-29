/**
 * @fileoverview database.js
 * This is the configuration file for the MongoDB database, which is hosted on Atlas Cloud. 
 * This connects the server to the DB via the Mongoose package.
 */

/* import dependencies */
const mongoose = require('mongoose');
const debuglog = require('../debuglog');

/* import env variables */
const username = process.env.MONGOATLAS_USERNAME;
const password = process.env.MONGOATLAS_PASSWORD;
const cluster = process.env.MONGOATLAS_CLUSTER;

// set up full databaseUrl path
const databaseUrl = `mongodb+srv://${username}:${password}@${cluster}`;

/* connect to mongodb */
mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;

db.once('connected', () => {
    debuglog('LOG', 'database config', `Connected to MongoDB '${db.name}' at '${db.host}' at port ${db.port}`);
});