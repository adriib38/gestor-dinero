const express = require("express");
const authController = require("../../controllers/authController");
const router = express.Router();

//Registros endpoints
router
  .post("/signup", authController.signup)
  .post("/signin", authController.signin)



module.exports = router;
