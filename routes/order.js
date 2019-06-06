/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import express from 'express';
import order from '../controllers/order/order';
import authentication from '../middleware/auth';
import buyer from '../middleware/buyer';
import seller from '../middleware/seller';

const routerOrder = express.Router();

// get all orders
routerOrder.get('/api/v1/order', authentication, order.getOrders);

// post car purchase order
routerOrder.post('/api/v1/order', [authentication, buyer], order.postCarOrder);

// update purchase order
routerOrder.patch('/api/v1/order/:id/price', [authentication, buyer], order.updatePurchaseOrder);

// accept reject purchase order
routerOrder.patch('/api/v1/order/:id/status', [authentication, seller], order.acceptRejectPurchaseOrder);

export default routerOrder;
