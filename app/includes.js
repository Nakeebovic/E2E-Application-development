// =========================================================================
// ===============Include routes files==============//

const db = require("./config/dbConnection");
const system = require("./systems");

global.controllers = system.controllers;
global.models = system.models;
global.callbacks = system.callbacks;
global.helpers = system.helpers;
global.db = db;
// console.log(global.db);

// db.sequelize.sync({alter: false});
// =========================================================================
