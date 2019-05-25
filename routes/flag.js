/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import express from 'express';
import model from '../db/db';

const routerFlag = express.Router();

// get all flags
routerFlag.get('/api/v1/flag', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'successfully retrieved flags',
    flags: model.flag,
  });
});

export default routerFlag;
