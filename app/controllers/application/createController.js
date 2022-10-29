const Joi = require("joi");
const appConfig = require("../../config/app");
const createSchema = Joi.object().keys({
  name: Joi.string().required(),
});

module.exports = {
  create: async (req, res) => {
    const { body } = req;
    const createInputs = await global.helpers.validateInputs.validate(
      res,
      createSchema,
      body
    );
    const createdApplication = await global.db.application.create(createInputs);
    return appConfig.send(res, "created", createdApplication);
  },
};
