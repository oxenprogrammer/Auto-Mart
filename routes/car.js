/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import express from 'express';
import car from '../controllers/car/car';
import authentication from '../middleware/auth';

const routerCar = express.Router();

// get all cars
routerCar.get('/api/v1/car', authentication, car.getCars);

export default routerCar;
