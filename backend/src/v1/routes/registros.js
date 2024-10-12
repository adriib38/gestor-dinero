const express = require("express");
const registrosController = require("../../controllers/registrosController");
const router = express.Router();

const verifyToken = require("../../controllers/middlewares/verifyJWT.js");

router
  .get("/", verifyToken, registrosController.getAllRegistros)
  .get("/misregistros", verifyToken, registrosController.getRegistrosFromUser) //Second because it takes priority over /:id
  .get("/:id", verifyToken, registrosController.getRegistroById)
  .get("/c/:categoria", verifyToken, registrosController.getRegistroByCategory)
  .post("/", verifyToken, registrosController.createRegistro)
  .put("/:id", verifyToken, registrosController.updateRegistro)
  .delete("/:id", verifyToken, registrosController.deleteRegistro)

module.exports = router;
