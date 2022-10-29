const appConfig = require("../../config/app");
const Joi = require("joi");
const idSchema = Joi.number().integer().min(1).required();
module.exports = {
  delete: async (req, res) => {
    const id = +global.helpers.globalMethods.decrypt(req.params.id);
    const applicationId = await global.helpers.validateInputs.validate(
      res,
      idSchema,
      id
    );
    const selectedApplication = await global.db.application.findOne({
      where: {
        id: applicationId,
      },
    });
    if (selectedApplication === null) {
      return appConfig.send(res, "notFound", "notFound", false);
    }
    const removedApplication = await selectedApplication.destroy();
    return appConfig.send(res, "ok", removedApplication);
  },
};
