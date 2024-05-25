const InvariantError = require("../../exceptions/InvariantError");
const { QuizPayloadSchema } = require("./schema");

const QuizValidator = {
  validateQuizPayload: (payload) => {
    const validationResult = QuizPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = QuizValidator;
