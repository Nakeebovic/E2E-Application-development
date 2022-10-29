const appConfig = require("../../config/app");
const { Op } = require("sequelize");
const Joi = require("joi");
const idSchema = Joi.number().integer().min(1).required();
const indexSchema = Joi.object().keys({
  offset: Joi.number().integer().min(0),
  limit: Joi.number().integer().min(1).max(1000).default(10),
  orderBy: Joi.object().keys({
    coulmn: Joi.any().valid("id"),
    type: Joi.any().valid("ASC", "DESC"),
  }),
  search: Joi.string(),
});

module.exports = {
  getAll: async (req, res) => {
    const { query } = req;
    const indexInputs = await global.helpers.validateInputs.validate(
      res,
      indexSchema,
      query
    );
    const filterObj = {
      where: {},
      limit: indexInputs.limit || 10,
    };
    if (indexInputs.offset) {
      filterObj["offset"] = indexInputs.offset * filterObj.limit;
    }
    if (indexInputs.orderBy) {
      filterObj["order"] = [
        [indexInputs.orderBy.coulmn, indexInputs.orderBy.type],
      ];
    }
    if (indexInputs.search) {
      filterObj.where.name = { [Op.like]: `%${indexInputs.search}%` };
    }
    const selectedApplication = await global.db.application.findAndCountAll(filterObj);
    return appConfig.send(res, "ok", selectedApplication);
  },
  getOne: async (req, res) => {
    const id = global.helpers.globalMethods.decrypt(req.params.id);
    const adId = await global.helpers.validateInputs.validate(
      res,
      idSchema,
      id
    );
    const selectedApp = await global.db.application.findOne({
      where: {
        id: adId,
      },
    });
    
    if (selectedApp === null) {
      return appConfig.send(res, "notFound", "notFound", false);
    }
    return appConfig.send(res, "ok", selectedApp);
  },
};
