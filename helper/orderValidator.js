/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import Joi from 'joi';

export default {
  // car advert required fields
  validateOrder: field => {
    const schema = Joi.object().keys({
      car_id: Joi.number().required(),
      amount: Joi.number().required()
    });
    return Joi.validate(field, schema);
  }
};
