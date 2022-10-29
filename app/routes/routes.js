const router = require("express").Router();
const asyncHandler = require("../middlewares/error-handler/async");
const controllers = global.controllers;
//////// User API ///////////
// application
router.get("/application", asyncHandler(controllers.application.getController.getAll));
router.get("/application/:id", asyncHandler(controllers.application.getController.getOne));
router.post("/application", asyncHandler(controllers.application.createController.create));
router.put("/application/:id", asyncHandler(controllers.application.updateController.update));
router.delete("/application/:id", asyncHandler(controllers.application.deleteController.delete));

module.exports = router;
