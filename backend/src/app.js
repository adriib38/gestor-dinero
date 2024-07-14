require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

// Configura CORS
app.use(cors());

// Configura body-parser para manejar solicitudes JSON
app.use(express.json());

// Configura la ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, "app")));

// Print request in console
app.use(logger("tiny"));

app.use(cookieParser());

// Importar y usar las rutas
app.use("/api/v1", require("./v1/routes/registros"));
app.use("/api/v1/stats", require("./v1/routes/stats"));
app.use("/api/v1", require("./v1/routes/auth"));

// Error handler para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({
    error: "Endpoint not Found",
    endpoint: req.originalUrl,
  });
});

// Manejo global de errores (opcional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

module.exports = app;
