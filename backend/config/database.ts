/**
 * @fileoverview database.js
 * This is the configuration file for the MongoDB database, which is hosted on Atlas Cloud. 
 * This connects the server to the DB via the Mongoose package.
 */

/* import dependencies */
import { connect, connection, Connection } from 'mongoose';
import { debuglog } from '../debuglog';

/* import env variables */
const username = process.env.MONGOATLAS_USERNAME;
const password = process.env.MONGOATLAS_PASSWORD;
const cluster = process.env.MONGOATLAS_CLUSTER;

// set up full databaseUrl path
const databaseUrl = `mongodb+srv://${username}:${password}@${cluster}`;

/* connect to mongodb */
function connectDB(): void {
    connect(databaseUrl);
    const db: Connection = connection;

    db.once('open', async () => {
        debuglog('LOG', 'database config', `Connected to MongoDB '${db.name}' at '${db.host}' at port ${db.port}`);
    });
    db.on('error', () => {
        debuglog('ERROR', 'database config', `Error connecting to database`);
    });
}

export {
    connectDB
};