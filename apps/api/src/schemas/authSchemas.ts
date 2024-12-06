import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name should be a type of 'string'",
    "any.required": "Name is a required field",
  }),
  email: Joi.string().email().required().messages({
    "email.base": "Email should be a valid email format",
    "any.required": "Email is a required field",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is a required field",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "email.base": "Email should be a valid email format",
    "any.required": "Email is a required field",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is a required field",
  }),
});
