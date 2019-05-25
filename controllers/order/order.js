/* eslint-disable class-methods-use-this */
/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import model from '../../db/db';

class Order {
  getOrders(req, res) {
    res.status(200).send({
      success: 'true',
      message: 'successfully retrieved orders',
      orders: model.order,
    });
  }
}

const order = new Order();
export default order;
