const brandSchema = require('../models/brandSchema')

exports.list = async (req, res) => {
    try {
        const brands = await brandSchema.find();

        return res.json(brands)

    } catch (err) { return res.status(400).send() }
}

exports.create = async (req, res) => {
    try {
        const brand = await brandSchema.create(req.body);

        return res.json(brand);

    } catch (err) { return res.status(400).send() }
}

exports.delete = async (req, res) => {
    try {
        await brandSchema.findByIdAndRemove(req.params.brandId);

        return res.send()

    } catch (err) { return res.status(400).send() }
}