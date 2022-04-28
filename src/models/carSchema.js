const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
    {
        brand: {
            id: { type: String },
            name: { type: String },
        },
        model: { type: String, },
        version: { type: String, },
        year: { type: Number, },
        price: { type: Number, },
        plate: { type: String, },
        km: { type: Number, },
        trasmission: {
            id: { type: String, },
            name: { type: String }
        },
        doors: {
            id: { type: String, },
            name: { type: String }
        },
        fuel: {
            id: { type: String, },
            name: { type: String }
        },
        color: { type: String, },
        category: {
            id: { type: String, },
            name: { type: String }
        },
        extras: { type: Array },
        images:
        {
            key: { type: String },
            url: { type: String }
        }
    });

module.exports = mongoose.model("cars", carSchema);