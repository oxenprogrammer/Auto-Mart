/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import express from 'express';
import user from '../controllers/user/user';

const routerAuth = express.Router();

// get all users
routerAuth.get('/api/v1/user', user.getUsers);

// register user
routerAuth.post('/api/v1/auth/signup', user.signUp);

export default routerAuth;
