const InvariantError = require("../../exceptions/InvariantError");
const { AksaraPayloadSchema } = require("./schema");

const AksaraValidator = {
  validateAksaraPayload: (payload) => {
    const validationResult = AksaraPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AksaraValidator;
