import Joi from "joi";

export const eventSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.base": `"Title" should be a type of 'string'`,
    "string.min": `"Title" should have a minimum length of {#limit}`,
    "string.max": `"Title" should have a maximum length of {#limit}`,
    "any.required": `"Title" is a required field`,
  }),
  description: Joi.string().max(500).optional().messages({
    "string.base": `"Description" should be a type of 'string'`,
    "string.max": `"Description" should have a maximum length of {#limit}`,
  }),
  type: Joi.string().valid("Online", "Offline").required().messages({
    "any.required": `"Type" is a required field`,
    "any.only": `"Type" must be one of ['Online', 'Offline']`,
  }),
  location: Joi.string().when("type", {
    is: "Offline",
    then: Joi.string().max(200).required().messages({
      "string.max": `"Location" should have a maximum length of {#limit}`,
      "any.required": `"Location" is required for offline events`,
    }),
    otherwise: Joi.string().optional(),
  }),
  date: Joi.date().iso().greater("now").required().messages({
    "date.base": `"Date" should be a valid date format`,
    "date.greater": `"Date" must be a future date`,
    "any.required": `"Date" is a required field`,
  }),
  userId: Joi.number().required().messages({
    "any.required": `userId is a required field`,
    "number.base": "userId should be a type of number",
  }),
});
