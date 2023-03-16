const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// thard party middleWare
app.use(cors());
app.use(express.json());

// route
const productsRoute = require("./routes/products.route");
const userRoute = require("./routes/user.route");

app.use("/app/v1/products", productsRoute);
app.use("/app/v1/user", userRoute);

app.get("/", (req, res) => {
  res.send("ecommerse surver is connected!!");
});

module.exports = app;
