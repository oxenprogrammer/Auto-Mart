/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import express from 'express';
import car from '../controllers/car/car';
import authentication from '../middleware/auth';
import seller from '../middleware/seller';

const routerCar = express.Router();

// get all cars
routerCar.get('/api/v1/car', authentication, car.getCars);

// post car advert
routerCar.post('/api/v1/car', [authentication, seller], car.postCarAd);

// mark car as sold
routerCar.patch('/api/v1/car/:id/price', [authentication, seller], car.markAsSold);

export default routerCar;
