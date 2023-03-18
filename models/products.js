const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = new mongoose.Schema({
  sm: { type: Number },
  m: { type: Number },
  l: { type: Number },
  xl: { type: Number },
  "2xl": { type: Number },
  "3xl": { type: Number },
  sum: { type: Number },
});

const productsSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "please provide your product name"],
      minLength: [3, "name must be at list 3 characters"],
      maxLength: [100, "name is to long"],
    },

    productImage: {
      type: String,
    },

    productCategory: {
      type: String,
      required: [true, "please provide your product category"],
    },

    productBrand: {
      type: String,
      required: [true, "please provide your product brand"],
    },
    productPrice: {
      type: Number,
      required: [true, "please provide your product price"],
    },

    productStock: stockSchema,

    productSold: {
      type: Number,
    },
    ProductDeleted: {
      type: Boolean,
    },
    createdBy: {
      type: String,
    },
    updatedBy: {
      type: String,
    },
  },
  { timestamps: true }
);
const product = mongoose.model("product", productsSchema);
module.exports = product;
