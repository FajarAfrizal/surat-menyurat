const express = require("express");
const Route = express.Router();
const mail = require("../controllers/mail");
const upload = require("../middlewares/mullter");
const { AuthhorizeRoles } = require("../middlewares/principalMiddleware") 

Route.get("/data", mail.findAll);
Route.get("/data/:id", mail.findOne);
Route.post("/create", AuthhorizeRoles('tata_usaha'), upload.single("file"), mail.create);
Route.patch("/update/:id",upload.single("file"), mail.update);
Route.delete("/delete/:id", mail.deleted);
Route.get("/data/user/userId", mail.findAllUserId);
Route.get("/years", mail.totalMail);
Route.get("/data/type/:type", mail.getMailByType);

const routeProps = {
  Route,
  auth: true,
};

module.exports = routeProps;
