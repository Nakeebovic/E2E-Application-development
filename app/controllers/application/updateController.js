const appConfig = require("../../config/app");
const Joi = require("joi");
const idSchema = Joi.number().integer().min(1).required();
const updateSchema = Joi.object()
  .keys({
    name: Joi.string(),
  })
  .min(1);
module.exports = {
  update: async (req, res) => {
    const { body } = req;
    const id = +global.helpers.globalMethods.decrypt(req.params.id);
    const [updateInputs, appId] = await Promise.all([
      global.helpers.validateInputs.validate(res, updateSchema, body),
      global.helpers.validateInputs.validate(res, idSchema, id),
    ]);
    const selectedApp = await global.db.application.findOne({
      where: {
        id: appId,
      },
    });
    if (selectedApp === null) {
      return appConfig.send(res, "notFound", "notFound", false);
    }
    const updatedAd = await selectedApp.update(updateInputs);
    return appConfig.send(res, "ok", updatedAd);
  },
};
