const express = require("express");
const userController = require("../controller/user.controller");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");

const router = express.Router();

router.post("/create", userController.signup);

router.post("/login", userController.login);

router.get("/me", verifyToken, userController.getMe);
// router.get("/list", verifyToken, userController.getUsers);
router.get("/list", userController.getUsers);

router
  .route("/list/:id")
  .get(userController.getUser)
  /* .put(userController.updateUser)
  .delete(userController.deleteUser); */
  .put(verifyToken, authorization("admin"), userController.updateUser)
  .delete(verifyToken, authorization("admin"), userController.deleteUser);

module.exports = router;
