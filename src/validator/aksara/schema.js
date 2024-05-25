const Joi = require("joi");

const AksaraPayloadSchema = Joi.object({
  number: Joi.string().required(),
  label: Joi.string().required(),
  imgUrl: Joi.string().uri().allow("").optional(),
});

module.exports = { AksaraPayloadSchema };
