const Joi = require("joi");

const userSchema = Joi.object().keys({
  firstName: Joi.string().alphanum().min(3).max(20).required(),
  lastName: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  age: Joi.number().min(18).max(70).required(),
  gender: Joi.string().required(),
  phone_number: Joi.string().min(10).max(10).required(),
});

const updateUserSchema = Joi.object().keys({
  firstName: Joi.string().alphanum().min(3).max(20),
  lastName: Joi.string().alphanum().min(3).max(20),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  age: Joi.number().min(18).max(70),
  gender: Joi.string(),
  phone_number: Joi.string().min(10).max(10),
});

const idSchema = Joi.number();
const stringSchema = Joi.string().alphanum();

module.exports = { userSchema, updateUserSchema, idSchema ,stringSchema};
