/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import express from 'express';
import order from '../controllers/order/order';
import authentication from '../middleware/auth';

const routerOrder = express.Router();

// get all orders
routerOrder.get('/api/v1/order', authentication, order.getOrders);

export default routerOrder;
