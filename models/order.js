/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

// eslint-disable-next-line prefer-const
let goodOrder = {
  id: 1,
  buyer: 2,
  car_id: 1,
  created_on: Date.now(),
  amount: 200.05,
  status: 'pending',
  date_modified: Date.now()
};

// eslint-disable-next-line prefer-const
let realOrder = { car_id: 1, amount: 200 };

export default { goodOrder, realOrder };
