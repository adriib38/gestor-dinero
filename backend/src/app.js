require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

// Configura CORS
const allowedOrigins = ['http://localhost:3006'];
app.use(cors({
  origin: function(origin, callback){

    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'El CORS no permite este origen.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // Permite enviar y recibir cookies
}));

// Configura body-parser para manejar solicitudes JSON
app.use(express.json());

// Configura la ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, "app")));

// Print request in console
app.use(logger("tiny"));

app.use(cookieParser());

// Importar y usar las rutas
app.use("/status", async (req, res) => {
  return res.status(200).json({
    message: "Okay :)",
  });
})
app.use("/api/v1", require("./v1/routes/auth"));
app.use("/api/v1", require("./v1/routes/registros"));
app.use("/api/v1/stats", require("./v1/routes/stats"));

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
