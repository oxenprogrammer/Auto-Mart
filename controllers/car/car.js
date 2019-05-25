/* eslint-disable class-methods-use-this */
/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import model from '../../db/db';

class Car {
  getCars(req, res) {
    res.status(200).send({
      success: 'true',
      message: 'successfully retrieved cars',
      cars: model.car,
    });
  }
}

const car = new Car();
export default car;
