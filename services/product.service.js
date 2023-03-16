const product = require("../models/products");
const fs = require("fs");
const path = require("path");

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
exports.deleteProductServiceById = async (id) => {
  const result = await product.findByIdAndDelete(id);
  return result;
};

exports.patchProductServiceById = async (productId, patchData, newFileName) => {
  if (newFileName) {
    const imagePath = path.join(os.tmpdir(), patchData.productImage);
    const image = fs.unlinkSync(imagePath);
    patchData.productImage = newFileName;
  }

  const result = await product.updateOne(
    { _id: productId },
    { $set: patchData },
    { runValidators: true }
  );
  return result;
};
