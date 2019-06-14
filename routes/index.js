/* eslint-disable import/no-extraneous-dependencies */
/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import routerCar from './car';
import routerOrder from './order';
import routerAuth from './auth';
import routerFlag from './flag';

// const router = express.Router();
require('babel-core/register');
require('babel-polyfill');

module.exports = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
  app.use(routerAuth);
  app.use(routerCar);
  app.use(routerOrder);
  app.use(routerFlag);
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
};
