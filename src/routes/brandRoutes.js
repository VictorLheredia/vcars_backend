const routes = require('express').Router();
const brandController = require('../controllers/brandController')

routes

    .get("/brands", brandController.list)
    .post("/brands", brandController.create)
    .delete("/brands/:brandId", brandController.delete)

module.exports = routes;