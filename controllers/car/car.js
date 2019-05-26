/* eslint-disable class-methods-use-this */
/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import model from '../../db/db';
import filterValue from '../../middleware/helper';

class Car {
  getCars(req, res) {
    res.status(200).send({
      success: 'true',
      message: 'successfully retrieved cars',
      cars: model.car,
    });
  }

  postCarAd(req, res) {
    if (
      !req.body.state ||
      !req.body.price ||
      !req.body.manufacturer ||
      !req.body.model ||
      !req.body.body_type
    ) {
      return res.status(400).send({
        status: 400,
        error: 'Something went wrong, Internal Server Error',
      });
    }

    let lastCarId = 0;
    if (model.user.length > 0) {
      lastCarId = model.car[model.car.length - 1].id;
    }


    const carAd = {
      id: lastCarId + 1,
      owner: req.id,
      created_on: Date.now(),
      state: req.body.state,
      status: 'available',
      price: req.body.price,
      manufacturer: req.body.manufacturer,
      model: req.body.model,
      body_type: req.body.body_type,
      date_modified: Date.now(),
    };

    model.car.push(carAd);

    return res.status(201).send({
      status: 201,
      data: {
        id: carAd.id,
        owner: carAd.owner,
        created_on: carAd.created_on,
        manufacturer: carAd.manufacturer,
        model: carAd.model,
        price: carAd.price,
        state: carAd.state,
        status: carAd.status,
      },
    });
  }

  markAsSold(req, res) {
    const carAd = filterValue(model.car, 'id', parseInt(req.params.id, 10));
    // eslint-disable-next-line no-console
    console.log('search for car', carAd);
    if (!carAd) {
      return res.status(404).send({
        status: 404,
        error: `Vehicle with ID ${req.params.id} not found`,
      });
    } else if (!req.body.status) {
      return res.status(400).send({
        status: 400,
        error: 'Something went wrong, internal server errror',
      });
    }

    // mark as sold
    carAd.status = 'sold';

    return res.status(200).send({
      status: 200,
      data: {
        id: carAd.id,
        owner: carAd.owner,
        created_on: carAd.created_on,
        manufacturer: carAd.manufacturer,
        model: carAd.model,
        price: carAd.price,
        state: carAd.state,
        status: carAd.status,
      },
    });
  }
}

const car = new Car();
export default car;
