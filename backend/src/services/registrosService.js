const { v4: uuid } = require("uuid");
const db = require("../database");

const getRegistroById = (req, res) => {
  return new Promise((resolve, reject) => {
    db.query(
      `
        SELECT * FROM registros WHERE id = ?
      `,
      [req.params.id],
      (err, results) => {
        if (err) {
          console.error("Error al obtener stats:", err);
          reject(err);
        } else {
          resolve(results[0]);
        }
      }
    );
  });
};

const getRegistroByCategory = (req, res) => {
  return new Promise((resolve, reject) => {
    db.query(
      `
      SELECT * FROM registros WHERE categoria
    `,
      [req.params.categoria],
      (err, results) => {
        if (err) {
          console.error("Error al obtener stats:", err);
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const getAllRegistros = () => {
  return new Promise((resolve, reject) => {
    db.query(
    `
      SELECT * FROM registros
    `,
      (err, results) => {
        if (err) {
          console.error("Error al obtener stats:", err);
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const updateRegistro = (id, newRegistro) => {
  const { concepto, observaciones, categoria, tipo, cantidad } = newRegistro;

  const updateFields = [
    concepto !== undefined ? "concepto = ?" : null,
    observaciones !== undefined ? "observaciones = ?" : null,
    categoria !== undefined ? "categoria = ?" : null,
    tipo !== undefined ? "tipo = ?" : null,
    cantidad !== undefined ? "cantidad = ?" : null,
  ]
    .filter((field) => field !== null)
    .join(", ");

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
  ].filter((param) => param !== undefined);

  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
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
    });
  });
};


const createRegistro = (newRegistro) => {
  const nuevoId = uuid();

  const { concepto, observaciones, categoria, tipo, cantidad } = newRegistro;
  const query =
    "INSERT INTO registros (id, concepto, observaciones, categoria, tipo, cantidad) VALUES (?, ?, ?, ?, ?, ?)";

  return new Promise((resolve, reject) => {
    const now = Date.now();
    db.query(
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
    db.query(query, (err, results) => {
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
  updateRegistro,
};
