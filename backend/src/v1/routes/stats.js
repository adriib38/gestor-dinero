const express = require("express");
const statsRegistrosController = require("../../controllers/statsRegistrosController")
const router = express.Router();

//Registros endpoints

router
    .get("/resume", statsRegistrosController.getStats)
    .get("/cantidadCategoriasGastos", statsRegistrosController.getCantidadCategoriasGastos)
    .get("/cantidadCategoriasIngresos", statsRegistrosController.getCantidadCategoriasIngresos)

module.exports = router;
