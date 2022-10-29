module.exports = {
  send: (res, code, data, success = true) => {
    statusCode = {
      ok: 200,
      created: 201,
      badRequest: 400,
      unauthorized: 401,
      forbidden: 403,
      notFound: 404,
      conflict: 409,
      unprocessableEntity: 422,
      serverError: 500,
    };
    const responseBody = {};
    responseBody["success"] = success;
    responseBody["code"] = statusCode[code];
    success
      ? (responseBody["data"] = data)
      : (responseBody["message"] = data || "");
    return res.status(statusCode[code]).json(responseBody);
  },
};
