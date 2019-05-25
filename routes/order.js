/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import express from 'express';
import model from '../db/db';

const routerOrder = express.Router();

// get all orders
routerOrder.get('/api/v1/order', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'successfully retrieved orders',
    orders: model.order,
  });
});

export default routerOrder;
