/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import express from 'express';
import model from '../db/db';

const routerCar = express.Router();

// get all cars
routerCar.get('/api/v1/car', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'successfully retrieved cars',
    cars: model.car,
  });
});

export default routerCar;
