/* eslint-disable class-methods-use-this */
/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import model from '../../db/db';
import filterValue from '../../middleware/helper';

class User {
  getUsers(req, res) {
    res.status(200).send({
      success: 'true',
      message: 'successfully retrieved users',
      users: model.user
    });
  }

  async signUp(req, res) {
    let emailExist = '';

    // eslint-disable-next-line array-callback-return
    model.user.map(oneUser => {
      emailExist = oneUser.email;
    });

    if (req.body.email === emailExist) {
      return res.status(409).send({
        status: 409,
        error: `user with email ${req.body.email} exists`
      });
      // eslint-disable-next-line no-else-return
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
    let lastUserId = 0;
    if (model.user.length > 0) {
      lastUserId = model.user[model.user.length - 1].id;
    }

    const salt = await bcryptjs.genSalt(10);
    req.body.password = await bcryptjs.hash(req.body.password, salt);

    const newUser = {
      id: lastUserId + 1,
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address: req.body.address,
      is_admin: true,
      user_class: req.body.user_class,
      password: req.body.password
    };

    model.user.push(newUser);

    const token = jsonwebtoken.sign(
      { id: newUser.id, is_admin: newUser.is_admin, user_class: newUser.user_class },
      'supertopsecret',
      { expiresIn: '24h' }
    );

    return res
      .header('x-auth-token', token)
      .status(201)
      .send({
        status: 201,
        data: {
          token,
          id: newUser.id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          is_admin: newUser.is_admin,
          password: newUser.password
        }
      });
  }

  async login(req, res) {
    const userExists = filterValue(model.user, 'email', req.body.email);
    if (!userExists) {
      return res.status(400).send({
        status: 400,
        error: 'wrong email or password'
      });
    }

    const validUserPassword = await bcryptjs.compare(req.body.password, userExists.password);

    if (!validUserPassword) {
      return res.status(400).send({
        status: 400,
        error: 'wrong email or password'
      });
    }

    const token = jsonwebtoken.sign(
      { id: userExists.id, is_admin: userExists.is_admin, user_class: userExists.user_class },
      'supertopsecret',
      { expiresIn: '24h' }
    );
    return res
      .header('x-auth-token', token)
      .status(200)
      .send({
        status: 200,
        data: {
          token,
          id: userExists.id,
          first_name: userExists.first_name,
          last_name: userExists.last_name,
          email: userExists.email,
          is_admin: userExists.is_admin,
          user_class: userExists.user_class
        }
      });
  }
}

const user = new User();
export default user;
