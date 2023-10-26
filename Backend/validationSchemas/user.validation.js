const Joi = require("joi");

const userValidator = Joi.object().keys({
  firstName: Joi.string().alphanum().min(3).max(20).required(),
  lastName: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  age: Joi.number().min(18).max(70).required(),
  gender: Joi.string().required(),
  phone_number: Joi.string().required(),
});

const updateUserValidator = Joi.object().keys({
  firstName: Joi.string().alphanum().min(3).max(20),
  lastName: Joi.string().alphanum().min(3).max(20),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  age: Joi.number().min(18).max(70),
  gender: Joi.string(),
  phone_number: Joi.string(),
});

const idValidator = Joi.number();

module.exports = { userValidator, updateUserValidator, idValidator };
