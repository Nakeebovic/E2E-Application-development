const dotenv = require("dotenv").config().parsed;
module.exports = {
  development: {
    username: dotenv.DB_USER,
    password: dotenv.DB_PASSWORD,
    database: dotenv.DB_NAME,
    host: dotenv.DB_HOST,
    dialect: "mysql",
  },
  test: {
    username: dotenv.DB_USER,
    password: dotenv.DB_PASSWORD,
    database: dotenv.DB_NAME,
    host: dotenv.DB_HOST,
    dialect: "mysql",
  },
  production: {
    username: dotenv.DB_USER,
    password: dotenv.DB_PASSWORD,
    database: dotenv.DB_NAME,
    host: dotenv.DB_HOST,
    dialect: "mysql",
  },
};
