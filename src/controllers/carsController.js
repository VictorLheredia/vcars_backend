const carSchema = require('../models/carSchema')

exports.list = async (req, res) => {
    try {
        const cars = await carSchema.find();

        return res.json(cars)

    } catch (err) { return res.status(400).send() }
}

exports.listById = async (req, res) => {
    try {
        const car = await carSchema.findById(req.params.carId);

        return res.json(car)

    } catch (err) { return res.status(400).send() }
}

exports.create = async (req, res) => {
    try {
        const car = await carSchema.create(req.body);

        return res.json(car);

    } catch (err) { return res.status(400).send() }
}

exports.update = async (req, res) => {
    try {
        const car = await carSchema.findByIdAndUpdate(req.params.carId, req.body, { new: true });

        return res.json(car);

    } catch (err) { return res.status(400).send() }
}

exports.delete = async (req, res) => {
    try {
        await carSchema.findByIdAndRemove(req.params.carId);

        return res.send()

    } catch (err) { return res.status(400).send() }
}