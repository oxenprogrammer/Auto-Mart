/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import express from 'express';
import order from '../controllers/order/order';

const routerOrder = express.Router();

// get all orders
routerOrder.get('/api/v1/order', order.getOrders);

export default routerOrder;
