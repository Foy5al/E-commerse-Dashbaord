const user = require("../models/userinfo.schema");
const ObjectId = require("mongoose").ObjectId;
const bcryptjs = require("bcryptjs");

exports.signupService = async (userInfo) => {
  const result = await user.create(userInfo);
  return result;
};

exports.loginService = async (email) => {
  const result = await user.findOne({ email });
  return result;
};

exports.getUsersService = async () => {
  const result = await user.find(
    {},
    {
      _id: 1,
      email: 1,
      role: 1,
      name: 1,
      status: 1,
      primary: 1,
      createdAt: 1,
      updatedAt: 1,
    }
  );
  return result;
};

// -------------------------single user-------------------------
exports.getUserInfoSchema = async (id) => {
  const result = await user.findById(id);
  return result;
};

exports.updateUserInfoSchema = async (id, data) => {
  const query = { _id: ObjectId(id) };
  let { password, confirmPassword, ...updatedData } = data;
  if (data.password) {
    const hashedPassword = bcryptjs.hashSync(data.password);
    updatedData.password = hashedPassword;
  }
  const result = await user.updateMany(query, updatedData);
  return result;
};
exports.deleteUserInfoSchema = async (id) => {
  const query = { _id: ObjectId(id) };
  const result = await user.deleteOne(query);
  return result;
};
