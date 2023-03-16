const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// thard party middleWare
app.use(cors());
app.use(express.json());

// route
const productsRoute = require("./routes/products.route");

app.use("/app/v1/products", productsRoute);

app.get("/", (req, res) => {
  res.send("ecommerse surver is connected!!");
});

app.get("/image/:name", (req, res) => {
  const { name } = req.params;
  console.log(`./uploads/${name}`);
  // Set the content type to image/jpeg or image/png depending on your image type
  res.setHeader("Content-Type", "image/png");

  // Read the image file using fs
  const fs = require("fs");
  const image = fs.readFileSync(`./uploads/${name}`);

  // Send the image data as the response
  res.send(image);
});

module.exports = app;
