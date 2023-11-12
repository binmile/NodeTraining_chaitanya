const Joi = require("joi");

const userSchema = Joi.object().keys({
  FirstName: Joi.string().alphanum().min(3).max(20).required(),
  LastName: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string().min(6)
  .max(30)
  .required()
  .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
  email: Joi.string(),
  age: Joi.number().min(18).max(70).required(),
  gender: Joi.string().required(),
  phone_number: Joi.string().min(10).max(10).required(),
});

const updateUserSchema = Joi.object().keys({
  FirstName: Joi.string().alphanum().min(3).max(20),
  LastName: Joi.string().alphanum().min(3).max(20),
  email: Joi.string(),
  age: Joi.number().min(18).max(70),
  gender: Joi.string(),
  phone_number: Joi.string().min(10).max(10),
});

const idSchema = Joi.number();
const stringSchema = Joi.string().alphanum();

module.exports = { userSchema, updateUserSchema, idSchema, stringSchema };
