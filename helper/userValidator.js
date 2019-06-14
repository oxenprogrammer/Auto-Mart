/* jshint esversion: 8 */
/* jshint -W097 */
/* jshint node: true */

import Joi from 'joi';

export default {
  // user SignUp
  validateSignUp: field => {
    const schema = Joi.object().keys({
      first_name: Joi.string()
        .strict()
        .trim()
        .required(),
      last_name: Joi.string()
        .strict()
        .trim()
        .required(),
      email: Joi.string()
        .strict()
        .trim()
        .email({ minDomainAtoms: 2 })
        .required(),
      password: Joi.string()
        .min(6)
        .max(30)
        .required(),
      user_class: Joi.string()
        .strict()
        .trim()
        .required(),
      address: Joi.string()
        .strict()
        .trim()
        .required()
    });
    return Joi.validate(field, schema);
  }
};
