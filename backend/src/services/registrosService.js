const { v4: uuid } = require("uuid");
const mysql = require("mysql");

require('dotenv').config();

var pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

const getRegistroById = (req, res) => {
  const query = `SELECT * FROM registros WHERE id = "${req.params.id}"`;

  return new Promise((resolve, reject) => {
    pool.query(query, (err, results) => {
      if (err) {
        console.error("Error al obtener registros:", err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const getRegistroByCategory = (req, res) => {
  const query = `SELECT * FROM registros WHERE categoria = "${req.params.categoria}"`;

  return new Promise((resolve, reject) => {
    pool.query(query, (err, results) => {
      if (err) {
        console.error("Error al obtener registros:", err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const getAllRegistros = () => {
  const query = "SELECT * FROM registros";

  return new Promise((resolve, reject) => {
    pool.query(query, (err, results) => {
      if (err) {
        console.error("Error al obtener registros:", err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const updateRegistro = (id, newRegistro) => {
  const { concepto, observaciones, categoria, tipo, cantidad } = newRegistro;

  const updateFields = [
    concepto !== undefined ? 'concepto = ?' : null,
    observaciones !== undefined ? 'observaciones = ?' : null,
    categoria !== undefined ? 'categoria = ?' : null,
    tipo !== undefined ? 'tipo = ?' : null,
    cantidad !== undefined ? 'cantidad = ?' : null,
  ].filter(field => field !== null).join(', ');

  const query = `
    UPDATE registros
    SET ${updateFields}
    WHERE id = ?;
  `;

  const params = [
    concepto,
    observaciones,
    categoria,
    tipo,
    cantidad,
    id,
  ].filter(param => param !== undefined);

  return new Promise((resolve, reject) => {
    pool.query(
      query,
      params,
      (err, results) => {
        if (err) {
          console.error("Error al actualizar el registro:", err);
          reject(err);
        } else {
          const updatedRegistro = {
            id,
            concepto,
            observaciones,
            categoria,
            tipo,
            cantidad,
          };
          resolve(updatedRegistro);
        }
      }
    );
  });
};

const createRegistro = (newRegistro) => {
  const nuevoId = uuid();

  const { concepto, observaciones, categoria, tipo, cantidad } = newRegistro;
  const query = "INSERT INTO registros (id, concepto, observaciones, categoria, tipo, cantidad) VALUES (?, ?, ?, ?, ?, ?)";

  return new Promise((resolve, reject) => {
    const now = Date.now();
    pool.query(
      query,
      [nuevoId, concepto, observaciones, categoria, tipo, cantidad],
      (err, results) => {
        if (err) {
          console.error("Error al obtener registros:", err);
          reject(err);
        } else {
          const nuevoRegistro = {
            nuevoId,
            concepto,
            observaciones,
            categoria,
            tipo,
            cantidad,
          };
          resolve(nuevoRegistro);
        }
      }
    );
  });
};

const deleteRegistro = (req, res) => {
  const query = `DELETE FROM registros WHERE id = "${req.params.id}"`;

  return new Promise((resolve, reject) => {
    pool.query(query, (err, results) => {
      if (err) {
        console.error("Error al obtener registros:", err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  getAllRegistros,
  getRegistroById,
  getRegistroByCategory,
  deleteRegistro,
  createRegistro,
  updateRegistro
};
