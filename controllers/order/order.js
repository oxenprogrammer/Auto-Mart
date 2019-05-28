/* eslint-disable class-methods-use-this */
/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import model from '../../db/db';
import filterValue from '../../middleware/helper';

class Order {
  getOrders(req, res) {
    res.status(200).send({
      success: 'true',
      message: 'successfully retrieved orders',
      orders: model.order,
    });
  }

  postCarOrder(req, res) {
    if (!req.body.car_id || !req.body.amount) {
      return res.status(400).send({
        status: 400,
        error: 'Something went wrong, Internal Server Error',
      });
    }

    let lastOrderId = 0;
    if (model.order.length > 0) {
      lastOrderId = model.order[model.order.length - 1].id;
    }

    const carId = model.car.find(car => car.id === req.body.car_id);

    if (!carId) {
      return res.status(404).send({
        status: 404,
        error: `Car with ID ${req.body.car_id} not found`,
      });
    }

    const carOrder = {
      id: lastOrderId + 1,
      buyer: req.id,
      created_on: Date.now(),
      car_id: req.body.car_id,
      amount: req.body.amount,
      status: 'pending',
      date_modified: Date.now(),
    };

    model.order.push(carOrder);

    return res.status(201).send({
      status: 201,
      data: {
        id: carOrder.id,
        buyer: carOrder.buyer,
        orderedCar: carOrder.car_id,
        created_on: carOrder.created_on,
        amount: carOrder.price,
        status: carOrder.status,
      },
    });
  }
}

const order = new Order();
export default order;
