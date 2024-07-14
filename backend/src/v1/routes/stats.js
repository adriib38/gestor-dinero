const express = require("express");
const statsRegistrosController = require("../../controllers/statsRegistrosController")
const router = express.Router();

const verifyToken = require("../../controllers/middlewares/verifyJWT.js");

//Registros endpoints

router
    .get("/resume", verifyToken, statsRegistrosController.getStats)
    .get("/cantidadCategoriasGastos", verifyToken, statsRegistrosController.getCantidadCategoriasGastos)
    .get("/cantidadCategoriasIngresos", verifyToken, statsRegistrosController.getCantidadCategoriasIngresos)

module.exports = router;
