const db = require("../database");

const getStats = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `
      SELECT
      COUNT(*) AS 'Número de registros',
      SUM(CASE WHEN tipo = 'gasto' THEN 1 ELSE 0 END) AS 'Número de gastos',
      SUM(CASE WHEN tipo = 'ingreso' THEN 1 ELSE 0 END) AS 'Número de ingresos',
      SUM(CASE WHEN tipo = 'gasto' THEN cantidad ELSE 0 END) AS 'Gastos (€)',
      SUM(CASE WHEN tipo = 'ingreso' THEN cantidad ELSE 0 END) AS 'Ingresos (€)',
      (SELECT categoria FROM registros WHERE tipo = 'gasto' GROUP BY categoria ORDER BY COUNT(*) DESC LIMIT 1) AS 'Categoría moda gastos',
      (SELECT categoria FROM registros WHERE tipo = 'ingreso' GROUP BY categoria ORDER BY COUNT(*) DESC LIMIT 1) AS 'Categoría moda ingresos'
      FROM registros;
      `,
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

const getCantidadCategoriasTipo = (req, res, tipo) => {
  return new Promise((resolve, reject) => {
    db.query(
    `
      SELECT id, SUM(cantidad) as 'value', categoria as 'label'
      FROM registros
      WHERE tipo = ?
      GROUP BY categoria;
    `,[tipo],
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

module.exports = {
  getStats,
  getCantidadCategoriasTipo,
};
