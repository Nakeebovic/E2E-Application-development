var express = require("express");
var path = require("path");
var logger = require("morgan");
const https = require("https");
const http = require("http");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const errorHandeler = require("./app/middlewares/error-handler/error");
var app = express();
app.set("port", process.env.PORT || 5030);
// view engine setup
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(express.json({ limit: "100mb" }));
app.use(fileUpload());
app.use(cookieParser());
// =====include site Controllers file====================//
var corsOptions = {
  origin: true,
  allowedHeaders: [
    "Content-Type",
    "withCredentials",
    "_lang",
    "Authorization",
    "Accept",
    "X-Requested-With",
    "X-HTTP-Method-Override",
    "x-reset-token",
    "x-invite-token",
    "x-access-token",
    "_token",
    "x-api-key",
    "x-www-form-urlencoded",
    "loader",
  ],
  credentials: true,
  withCredentials: true,
};
app.use(cors(corsOptions));
require("./app/includes");
app.use(require("./app/routes/routes"));

// ===============run the node server====================//
// const server = https.createServer(
//   {
//     key: fs.readFileSync("./privkey.pem"),
//     cert: fs.readFileSync("./fullchain.pem"),
//   },
//   app
// );
const server = http.createServer(app);

const terminate = require("./terminate");
const exitHandler = terminate(server, {
  coredump: false,
  timeout: 500,
});
process.on("uncaughtException", exitHandler(1, "Unexpected Error"));
process.on("unhandledRejection", exitHandler(1, "Unhandled Promise"));
process.on("SIGTERM", exitHandler(0, "SIGTERM"));
process.on("SIGINT", exitHandler(0, "SIGINT"));
app.use(errorHandeler);


server.listen(process.env.PORT || app.get("port"), function () {
  console.log("Listening on port " + app.get("port"));

  // setup socket connection //

  // ====================== //

  // setup cron //
  // global.controllers.CronController.setup();
  //  ======== //
});

module.exports = app;
