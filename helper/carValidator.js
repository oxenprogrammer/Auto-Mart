/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import Joi from 'joi';

export default {
  // car advert required fields
  validateCar: field => {
    const schema = Joi.object().keys({
      state: Joi.string()
        .strict()
        .trim()
        .required(),
      manufacturer: Joi.string()
        .strict()
        .trim()
        .required(),
      price: Joi.number().required(),
      model: Joi.string()
        .strict()
        .trim()
        .required(),
      body_type: Joi.string()
        .strict()
        .trim()
        .required()
    });
    return Joi.validate(field, schema);
  }
};
