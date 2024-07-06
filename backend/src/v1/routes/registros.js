const express = require("express");
const registrosController = require("../../controllers/registrosController");
const router = express.Router();

const verifyToken = require("../../controllers/middlewares/verifyJWT.js");

router
  .get("/", verifyToken, registrosController.getAllRegistros)
  .get("/:id", registrosController.getRegistroById)
  .get("/c/:categoria", registrosController.getRegistroByCategory)
  .post("/", registrosController.createRegistro)
  .put("/:id", registrosController.updateRegistro)
  .delete("/:id", registrosController.deleteRegistro);

module.exports = router;
