const express = require("express");
const statsRegistrosController = require("../../controllers/statsRegistrosController")
const router = express.Router();

console.log('STATS.js')
//Registros endpoints

router
    .get("/resume", statsRegistrosController.getStats)

module.exports = router;
