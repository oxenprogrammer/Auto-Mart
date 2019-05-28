/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import express from 'express';
import order from '../controllers/order/order';
import authentication from '../middleware/auth';
import buyer from '../middleware/buyer';

const routerOrder = express.Router();

// get all orders
routerOrder.get('/api/v1/order', authentication, order.getOrders);

// post car purchase order
routerOrder.post('/api/v1/order', [authentication, buyer], order.postCarOrder);

export default routerOrder;
