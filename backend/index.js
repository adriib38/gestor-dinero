require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');

//Configura CORS
app.use(cors());

//Configura body-parser para manejar solicitudes JSON
app.use(bodyParser.json()); 

//Configura la ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname, "app")));


const registrosRoutes = require("./v1/routes/registros");
app.use("/api/v1", registrosRoutes);

app.get("/", function (req, res) {
  res.send( 
    {
      "Autor": "Adrián Benítez",
      "Hora local": new Date(),
      "Registros": "/api/v1"
    }
  );
});

const port = process.env.PORT ?? 3000
app.listen(port, function () {
  console.log("Servidor web iniciado en el puerto " + port);
});

module.exports = app;
