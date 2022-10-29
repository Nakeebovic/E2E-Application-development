const globalMethods = require("../../helpers/globalMethods");
const appConfig = require("../../config/app");
const errorHandeler = (err, req, res, next) => {
  let error = { ...err };
  let ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  error.message = err.message;
  globalMethods.saveException(err, ip);
  //response
  appConfig.send(res, "serverError", "someting_wrong", false);
};

module.exports = errorHandeler;
