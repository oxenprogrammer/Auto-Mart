/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import express from 'express';
import bodyParser from 'body-parser';
import routerAuth from './routes/auth';
import routerCar from './routes/car';
import routerOrder from './routes/order';
import routerFlag from './routes/flag';

// Set up the express app
const app = express();

// Middleware Use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routerAuth);
app.use(routerCar);
app.use(routerOrder);
app.use(routerFlag);

const PORT = 3000;

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server running on port ${PORT}`);
});

export default server;