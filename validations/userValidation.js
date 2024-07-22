const Joi = require('joi');

const registerUserSchema = Joi.object({
  body: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    avatar: Joi.string().optional()
  }),
  query: Joi.object(),
  params: Joi.object(),
});

const loginUserSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  query: Joi.object(),
  params: Joi.object(),
});


const userIdSchema = Joi.object({
  body: Joi.object(),
  query: Joi.object(),
  params: Joi.object({
    userId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  userIdSchema,
};
