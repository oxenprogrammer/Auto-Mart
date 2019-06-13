/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

let user;
let buyer;

// eslint-disable-next-line prefer-const
user = {
  id: 1,
  email: 'emmy1000okello@gmail.com',
  first_name: 'emanuel',
  last_name: 'okello',
  password: '123456',
  address: 'kampala',
  is_admin: true,
  user_class: 'SELLER'
};

// eslint-disable-next-line prefer-const
buyer = {
  id: 1,
  email: 'emmy1000okello@gmail.com',
  first_name: 'emanuel',
  last_name: 'okello',
  password: '123456',
  address: 'kampala',
  is_admin: true,
  user_class: 'BUYER'
};

export default { user, buyer };
