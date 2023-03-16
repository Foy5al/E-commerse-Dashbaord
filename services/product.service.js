const product = require("../models/products");

exports.createProductService = async (data, imageFile) => {
  if (imageFile) {
    data.productImage = imageFile.filename;
  }
  const result = await product.create(data);
  return result;
};

exports.getProductService = async () => {
  const result = await product.find({});
  return result;
};

exports.getProductServiceById = async (id) => {
  const result = await product.findById(id);
  return result;
};

exports.patchProductServiceById = async (productId, patchData) => {
  const result = await product.updateOne(
    { _id: productId },
    { $set: patchData },
    { runValidators: true }
  );
  return result;
};
