const Joi = require("joi");

const QuizPayloadSchema = Joi.object({
  question: Joi.string().required(),
  imgUrl: Joi.string().uri().allow("").optional(),
  correctAnswer: Joi.string().required(),
  incorrectAnswer1: Joi.string().required(),
  incorrectAnswer2: Joi.string().required(),
  incorrectAnswer3: Joi.string().required(),
});

module.exports = { QuizPayloadSchema };
