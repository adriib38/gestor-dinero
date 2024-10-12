const db = require("../database");

const getStats = (userUuid) => {
  return new Promise((resolve, reject) => {
    db.query(
      `
      SELECT
        IFNULL(COUNT(*), 0) AS 'Número de registros',
        IFNULL(SUM(CASE WHEN tipo = 'gasto' THEN 1 ELSE 0 END), 0) AS 'Número de gastos',
        IFNULL(SUM(CASE WHEN tipo = 'ingreso' THEN 1 ELSE 0 END), 0) AS 'Número de ingresos',
        IFNULL(SUM(CASE WHEN tipo = 'gasto' THEN cantidad ELSE 0 END), 0) AS 'Gastos (€)',
        IFNULL(SUM(CASE WHEN tipo = 'ingreso' THEN cantidad ELSE 0 END), 0) AS 'Ingresos (€)',
        (SELECT categoria 
        FROM registros 
        WHERE tipo = 'gasto' AND user = ? 
        GROUP BY categoria 
        ORDER BY COUNT(*) DESC 
        LIMIT 1) AS 'Categoría moda gastos',
        (SELECT categoria 
        FROM registros 
        WHERE tipo = 'ingreso' AND user = ? 
        GROUP BY categoria 
        ORDER BY COUNT(*) DESC 
        LIMIT 1) AS 'Categoría moda ingresos'
      FROM registros
      WHERE user = ?;
      `,[userUuid,userUuid,userUuid],
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

const getCantidadCategoriasTipo = (userUuid, tipo) => {
  return new Promise((resolve, reject) => {
    db.query(
    `
      SELECT id, SUM(cantidad) as 'value', categoria as 'label'
      FROM registros
      WHERE tipo = ? and user = ?
      GROUP BY categoria;
    `,[tipo, userUuid],
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
