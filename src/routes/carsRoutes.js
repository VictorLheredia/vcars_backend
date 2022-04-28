const routes = require('express').Router();
const carsController = require('../controllers/carsController');

routes
    .get("/cars", carsController.list)
    .get("/cars/:carId", carsController.listById)
    .post("/cars", carsController.create)
    .put("/cars/:carId", carsController.update)
    .delete("/cars/:carId", carsController.delete)

module.exports = routes;