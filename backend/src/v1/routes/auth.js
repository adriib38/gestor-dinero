const express = require("express");
const authController = require("../../controllers/authController");
const router = express.Router();

const verifyToken = require("../../controllers/middlewares/verifyJWT.js");

//Registros endpoints
router
  .post("/signup", authController.signup)
  .post("/signin", authController.signin)
  .post("/signout", authController.signout)
  .get("/user", verifyToken, authController.getUserByUuid)
  .delete("/delete", verifyToken, authController.deleteUserByUuid)


module.exports = router;
