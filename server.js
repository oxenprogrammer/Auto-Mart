/*jshint esversion: 6 */
/* jshint -W097 */
/* jshint node: true */

import express from 'express';
import bodyParser from 'body-parser';
import model from './db/db';
import bcryptjs  from 'bcryptjs';

// Set up the express app
const app = express();

// in-built middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// get all users
app.get('/api/v1/user', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'successfully retrieved users',
    users: model.user
  });
});

// register user
app.post('/api/v1/auth/signup', async (req, res) => {
  let emailExist = '';
  model.user.map((oneUser) => {
    emailExist = oneUser.email;
  });
  if (req.body.email === emailExist) {
    return res.status(409).send({
      status: 409,
      error: `user with email ${req.body.email} exists`
    });
  } else if (
    !req.body.email ||
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.password ||
    !req.body.address ||
    !req.body.user_class
  ) {
    return res.status(400).send({
      status: 400,
      error: 'Something went wrong, Internal Server Error'
    });
  }
  let last_userId = 0;
  if (model.user.length > 0) {
    last_userId = model.user[model.user.length - 1].id;
  }

  const salt = await bcryptjs.genSalt(10);
  req.body.password = await bcryptjs.hash(req.body.password, salt);

  const newUser = {
    id: last_userId + 1,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    address: req.body.address,
    is_admin: false,
    user_class: req.body.user_class,
    password: req.body.password
  };

  model.user.push(newUser);

  return res.status(201).send({
    status: 201,
    data: {
      token: '',
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      is_admin: newUser.is_admin,
      password: newUser.password
    }
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