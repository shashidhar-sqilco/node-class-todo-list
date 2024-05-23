const { RegisterUser, Login } = require("../controller/UserController");
const express = require("express");
const routes = express.Router();

routes.post("/auth/register", RegisterUser);
routes.post("/auth/login", Login);


module.exports = routes;
