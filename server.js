/*jshint esversion: 6 */
/* jshint -W097 */
/* jshint node: true */

import express from 'express';
import model from './db/db';

// Set up the express app
const app = express();

// get all users
app.get('/api/v1/user', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'successfully retrieved users',
    users: model.user
  });
});

// get all cars
app.get('/api/v1/car', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'successfully retrieved cars',
        cars: model.car
    });
});

// get all orders
app.get('/api/v1/order', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'successfully retrieved orders',
      orders: model.order
    });
});

// get all flags
app.get('/api/v1/flag', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'successfully retrieved flags',
      flags: model.flag
    });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});