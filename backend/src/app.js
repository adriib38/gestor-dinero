require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");


//Configura CORS
app.use(cors());

//Configura body-parser para manejar solicitudes JSON
app.use(bodyParser.json());

//Configura la ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, "app")));

//Print request in console
app.use(logger("tiny"));

app.use("/api/v1", require("./v1/routes/registros.js"));

//Error handler
app.use((req, res, next) => {
  res.status(404).json({
    error: "Endpoint not Found",
    endpoint: req.originalUrl,
  });
  next();
});

module.exports = app;
