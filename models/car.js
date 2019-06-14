/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

// eslint-disable-next-line prefer-const
let goodCar = {
  id: 1,
  owner: 1,
  status: 'available',
  state: 'new',
  created_on: Date.now(),
  price: 200.5,
  model: 'vs4-emmisteel',
  body_type: 'car',
  date_modified: Date.now(),
  manufacturer: 'toyota'
};

// eslint-disable-next-line prefer-const
let newCar = {
  state: 'new',
  price: 123,
  manufacturer: 'ghfhfh',
  model: 'dfeee',
  body_type: 'car'
};

export default { goodCar, newCar };
