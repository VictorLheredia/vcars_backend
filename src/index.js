require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization")
    app.use(cors);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp", "uploads")));

app.use(require("./routes/imagesRoutes"));
app.use(require("./routes/carsRoutes"));
app.use(require("./routes/brandRoutes"));
app.use(require("./routes/usersRoutes"));

app.listen(process.env.PORT || 4000);