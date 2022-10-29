const Joi = require("joi");
const appConfig = require("../config/app");

module.exports = {
  validate: (res, schema, data) => {
    return new Promise(async (resolve, reject) => {
      if (!data) {
        return appConfig.send(
          res,
          "unprocessableEntity",
          "data to validate not provided",
          false
        );
      }
      if (!schema) {
        return appConfig.send(
          res,
          "unprocessableEntity",
          "schema type to validate not provided",
          false
        );
      }
      if (!Joi.isSchema(schema)) {
        return appConfig.send(
          res,
          "unprocessableEntity",
          " Provided schema is not a valid Joi schema.",
          false
        );
      }
      const { value, error } = await schema.validate(data, {
        abortEarly: false,
      });
      const valid = error == null;
      if (valid) {
        resolve(value);
      } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");
        console.log("error", message);
        return appConfig.send(res, "unprocessableEntity", message, false);
      }
    });
  },
};
