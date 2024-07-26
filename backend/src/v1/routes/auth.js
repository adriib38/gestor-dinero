const express = require("express");
const authController = require("../../controllers/authController");
const router = express.Router();

//Registros endpoints
router
  .post("/signup", authController.signup)
  .post("/signin", authController.signin)
  .post("/signout", authController.signout)
  .get("/user", authController.user)



module.exports = router;
