const statsRegistrosService = require('../services/statsRegistrosService');

const getStats = async (req, res) => {
  try {
    const stats = await statsRegistrosService.getStats();
    res.send({ status: 'OK', data: stats})
  } catch (e) {
    console.error("Error al obtener stats:", error);
    res.status(500).send({ status: 'ERROR', message: 'Error al obtener stats' });
  }
}

const getCantidadCategoriasGastos= async (req, res) => {
  try {
    const stats = await statsRegistrosService.getCantidadCategoriasTipo(req, res, 'gasto');
    res.send({ status: 'OK', data: stats})
  } catch (e) {
    console.error("Error al obtener stats:", error);
    res.status(500).send({ status: 'ERROR', message: 'Error al obtener stats' });
  }
}

const getCantidadCategoriasIngresos= async (req, res) => {
  try {
    const stats = await statsRegistrosService.getCantidadCategoriasTipo(req, res, 'ingreso');
    res.send({ status: 'OK', data: stats})
  } catch (e) {
    console.error("Error al obtener stats:", error);
    res.status(500).send({ status: 'ERROR', message: 'Error al obtener stats' });
  }
}

module.exports = {
  getStats,
  getCantidadCategoriasGastos,
  getCantidadCategoriasIngresos
};
