const express = require("express");
const Route = express.Router();
const employeeController = require("../controllers/employeeController");

Route.post("/create", employeeController.create);
Route.get("/data", employeeController.findAll);
Route.get("/data/:id", employeeController.findOne);
Route.patch("/update/:id", employeeController.update);
Route.delete("/delete/:id", employeeController.deleted);
const routeProps = {
  Route,
  auth: false, // token [true, false]
};

module.exports = routeProps;
