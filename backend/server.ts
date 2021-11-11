/**
 * @fileoverview server.ts
 * This file handles the startup of the server
 */

/* import dependencies */
import express from 'express';
import dotenv from 'dotenv';
import body_parser from 'body-parser';

/* set up */
dotenv.config();
const app = express();

/* import modules */
import { debuglog } from './helpers/debuglog';
import { connectDB } from './config/database'
import { router } from './routes/router'; // listen for router endpoints

/* import env variables */
const backend_port = process.env.BACKEND_PORT;

/* startup server */
connectDB(); // connect to the database
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.use('/api', router); // all api routes will follow 'https://localhost:PORT/api/ENDPOINTS' format

app.listen(backend_port, () => {
    debuglog('LOG', 'server', `Server is listening on port ${backend_port}`);
});
