const express = require("express");
const Route = express.Router();
const postion = require("../controllers/position");

Route.post("/create", postion.Create);
Route.get("/data", postion.FindAll);
Route.get("/data/:id", postion.FindOne);
Route.patch("/update/:id", postion.Update);
Route.delete("/delete/:id", postion.Delete);

const routeProps = {
  Route,
  auth: true,
};

module.exports = routeProps;
