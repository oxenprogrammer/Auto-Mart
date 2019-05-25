/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import express from 'express';
import flag from '../controllers/flag/flag';

const routerFlag = express.Router();

// get all flags
routerFlag.get('/api/v1/flag', flag.getFlags);

export default routerFlag;
