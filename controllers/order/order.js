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

  updatePurchaseOrder(req, res) {
    const carOrder = filterValue(model.order, 'id', parseInt(req.params.id, 10));
    const pending = model.order.some(order => order.status === 'pending');
    // eslint-disable-next-line no-console
    console.log('search for order', carOrder);
    console.log('pending', pending);
    if (!carOrder) {
      return res.status(404).send({
        status: 404,
        error: `Purchase Order with ID ${req.params.id} not found`,
      });
    } else if (!pending) {
      return res.status(404).send({
        status: 404,
        error: `Vehicle ${carOrder.car_id} orders accepted or rejected already`,
      });
    } else if (!req.body.amount) {
      return res.status(400).send({
        status: 400,
        error: 'Something went wrong, internal server errror',
      });
    }

    // old price offered
    const oldPrice = carOrder.amount;

    // new car price
    carOrder.amount = req.body.amount;

    return res.status(200).send({
      status: 200,
      data: {
        id: carOrder.id,
        car_id: carOrder.car_id,
        created_on: carOrder.created_on,
        date_modified: Date.now(),
        old_price_offered: oldPrice,
        new_price_offered: carOrder.amount,
        status: carOrder.status,
      },
    });
  }

  acceptRejectPurchaseOrder(req, res) {
    const carOrder = filterValue(model.order, 'id', parseInt(req.params.id, 10));

    let carSeller;
    if (carOrder) carSeller = model.car.find(car => car.id === carOrder.car_id);

    if (!carOrder) {
      return res.status(404).send({
        status: 404,
        error: `Order with Id ${req.params.id} not found`,
      });
    } else if (carSeller.owner !== req.id) {
      return res.status(403).send({
        status: 403,
        error: 'It is illegal to sell someone\'s else car',
      });
    } else if (carOrder.status === 'accepted' || carOrder.status === 'rejected') {
      return res.status(400).send({
        status: 400,
        error: `This Order has already been ${carOrder.status}`,
      });
    } else if (!req.body.status) {
      return res.status(400).send({
        status: 400,
        error: 'Something went wrong',
      });
    }

    // reject or accept purchase order request from buyer
    carOrder.status = req.body.status;

    return res.status(200).send({
      status: 200,
      data: carOrder,
    });
  }
}

const order = new Order();
export default order;
