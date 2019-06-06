/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import routerAuth from './routes/auth';
import routerCar from './routes/car';
import routerOrder from './routes/order';
import routerFlag from './routes/flag';

// Set up the express app
const app = express();

// Middleware Use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());
app.use(cors());
app.use(routerAuth);
app.use(routerCar);
app.use(routerOrder);
app.use(routerFlag);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {});

export default server;