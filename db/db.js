/*jshint esversion: 6 */
/* jshint -W097 */
/* jshint node: true */

const user = [
    {
       id: 1,
       email: 'emmy1000okello@gmail.com',
       first_name: 'emanuel',
       last_name: 'okello',
       password: '123456',
       address: 'kampala',
       is_admin: true,
       user_class: 'SELLER'
    }
];

const car = [
    {
        id: 1,
        owner: 1,
        created_on: '05-22-2019',
        state: 'new',
        price: 5676.55,
        manufacturer: 'toyota',
        model: '1992',
        body_type: 'car',
        date_modified: '05-28-2019'
    }
];

const order = [
    {
        id: 1,
        buyer: 2,
        car_id: 1,
        amount: 5576.00,
        status: 'pending',
        created_on: '05-22-2019',
        date_modified: '05-28-2019'
    }
];

const flag = [
    {
        id: 1,
        car_id: 1,
        user_id: 2,
        created_on: '05-22-2019',
        date_modified: '05-28-2019'
    }
];