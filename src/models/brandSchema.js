const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
    {
        name: { type: String, required: true }
    },
    { versionKey: false },


);

module.exports = mongoose.model("brands", brandSchema);