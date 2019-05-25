/* eslint-disable class-methods-use-this */
/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import model from '../../db/db';

class Flag {
  getFlags(req, res) {
    res.status(200).send({
      success: 'true',
      message: 'successfully retrieved flags',
      flags: model.flag,
    });
  }
}

const flag = new Flag();
export default flag;
