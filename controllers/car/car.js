/* eslint-disable class-methods-use-this */
/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import model from '../../db/db';
import filterValue from '../../middleware/helper';

class Car {
  // getCars(req, res) {
  //   res.status(200).send({
  //     status: 200,
  //     data: model.car,
  //   });
  // }

  getCars(req, res) {
    const queryUnsold = req.query.status;

    if (queryUnsold) {
      // const minPrice = filterValue(model.car, 'price', req.query.min_price);
      // const maxPrice = filterValue(model.car, 'price', req.query.max_price);
      const cars = model.car.filter(car => car.status === req.query.status);

      if (req.query.min_price && req.query.max_price) {
        // eslint-disable-next-line max-len
        const filtered = cars.filter(car => car.price >= req.query.min_price && car.price <= req.query.max_price);
        res.status(200).send({
          status: 200,
          data: filtered,
        });
      }

      // eslint-disable-next-line no-console
      console.log('available cars', cars);
      if (!cars) {
        res.status(404).send({
          status: 404,
          error: 'No Car Advert found',
        });
      }

      res.status(200).send({
        status: 200,
        data: cars,
      });
    } else {
      res.status(200).send({
        status: 200,
        data: model.car,
      });
    }
  }

  getCar(req, res) {
    const car = filterValue(model.car, 'id', parseInt(req.params.id, 10));
    if (!car) {
      return res.status(404).send({
        status: 404,
        error: `Vehicle with ID ${req.params.id} not found`,
      });
    }

    return res.status(200).send({
      car,
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
    if (model.car.length > 0) {
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

  updateCarPrice(req, res) {
    const carAd = filterValue(model.car, 'id', parseInt(req.params.id, 10));
    // eslint-disable-next-line no-console
    console.log('search for car', carAd);
    if (!carAd) {
      return res.status(404).send({
        status: 404,
        error: `Vehicle with ID ${req.params.id} not found`,
      });
    } else if (!req.body.price) {
      return res.status(400).send({
        status: 400,
        error: 'Something went wrong, internal server errror',
      });
    }

    // update car price
    carAd.price = req.body.price;

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

  deleteCarAd(req, res) {
    // eslint-disable-next-line array-callback-return
    model.car.map((car, index) => {
      if (car.id === parseInt(req.params.id, 10)) {
        model.car.splice(index, 1);
        return res.status(202).send({
          status: 202,
          data: '​ Car Ad successfully deleted',
        });
      }
      return res.status(400).send({
        status: 400,
        data: '​Something went wrong',
      });
    });

    return res.status(404).send({
      status: 404,
      error: `Car with ID ${req.params.id} not found`,
    });
  }
}

const car = new Car();
export default car;
