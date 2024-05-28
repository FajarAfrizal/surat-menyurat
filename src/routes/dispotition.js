const express = require("express");
const Route = express.Router();
const dispotitionController = require("../controllers/dispotitionController");

Route.post("/create", dispotitionController.create);
Route.get("/data", dispotitionController.findAll);
Route.get("/data/:id", dispotitionController.findOne);
Route.patch("/update/:id", dispotitionController.update);
Route.delete("/delete/:id", dispotitionController.remove);
Route.get("/data/user/userId", dispotitionController.getByUserId);
const routeProps = {
  Route,
  auth: true, // token [true, false]
};

module.exports = routeProps;
