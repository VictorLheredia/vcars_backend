const routes = require('express').Router();
const imagesController = require('../controllers/imagesController')

const multer = require('multer');
const multerConfig = require('../config/multer');
const saveImage = multer(multerConfig).single('file')

routes

    .post("/images/:carId", saveImage, imagesController.upload)
    .delete("/images/:carId/:key", imagesController.delete)

module.exports = routes;