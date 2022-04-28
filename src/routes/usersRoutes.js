const routes = require("express").Router();
const usersController = require("../controllers/usersController");

routes

    .post("/users/register", usersController.register)
    .post("/users/login", usersController.login)



module.exports = routes;