/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import express from 'express';
import flag from '../controllers/flag/flag';
import authentication from '../middleware/auth';

const routerFlag = express.Router();

// get all flags
routerFlag.get('/api/v1/flag', authentication, flag.getFlags);

export default routerFlag;
