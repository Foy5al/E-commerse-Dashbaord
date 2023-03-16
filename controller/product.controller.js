const fs = require("fs");
exports.projectContentName = () => {
  return "mrzero@backlog.dev";
};
const {
  createProductService,
  getProductService,
  patchProductServiceById,
  getProductServiceById,
} = require("../services/product.service");

exports.createProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    const imageFile = req.file;
    const result = await createProductService(req.body, imageFile);

    res.status(200).json({
      status: "success",
      message: "Product inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Product couldn't insert",
      error: error.message,
    });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const { filter } = req.params;
    const result = await getProductService();
    let filteredData;
    if (filter === "active") {
      filteredData = result.filter((item) => item.ProductDeleted !== true);
    } else if (filter === "inactive") {
      filteredData = result.filter((item) => item.ProductDeleted !== false);
    } else if (filter === "sold") {
      filteredData = result.filter((item) => item.productSold > 0);
    } else {
      filteredData = result.filter(
        (item) => JSON.stringify(item._id).replace(/"/g, "") === filter
      );
    }

    res.status(200).json({
      status: "success",
      message: "Product get successfully",
      data: filteredData,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Product couldn't get",
      error: error.message,
    });
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getProductServiceById(id);
    res.status(200).json({
      status: "success",
      message: "Data get successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data couldn't get",
      error: error.message,
    });
  }
};

exports.patchProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await patchProductServiceById(
      id,
      req.body,
      req?.file?.filename
    );
    res.status(200).json({
      status: "success",
      message: "Data get successfully",
      data: "result",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data couldn't get",
      error: error.message,
    });
  }
};
exports.getImageById = async (req, res, next) => {
  try {
    const { name } = req.params;
    console.log(`mal aise`);
    // Set the content type to image/jpeg or image/png depending on your image type
    res.setHeader("Content-Type", "image/png");

    // Read the image file using fs
    const image = fs.readFileSync(`./uploads/${name}`);
    // Send the image data as the response
    res.send(image);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Image not found",
      error: error.message,
    });
  }
};
