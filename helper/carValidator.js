/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import Joi from 'joi';

export default {
  // car advert required fields
  validateCar: field => {
    const schema = Joi.object().keys({
      state: Joi.string().required(),
      manufacturer: Joi.string().required(),
      price: Joi.number().required(),
      model: Joi.string().required(),
      body_type: Joi.string().required()
    });
    return Joi.validate(field, schema);
  }
};
