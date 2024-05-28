const express = require("express");
const Route = express.Router();
const user = require("../controllers/user");

Route.get("/data", user.Index);
Route.post("/create", user.Create);
Route.get("/data/:id", user.FindById);
Route.patch("/update/:id", user.Update);
Route.delete("/delete/:id", user.Delete);

const routeProps = {
  Route,
  auth: true, // token [true, false]
};

module.exports = routeProps;
