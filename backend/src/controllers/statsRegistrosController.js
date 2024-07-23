const statsRegistrosService = require('../services/statsRegistrosService');

const getStats = async (req, res) => {
  try {
    const stats = await statsRegistrosService.getStats(req.userUuid);
    res.send( stats )
  } catch (e) {
    console.error("Error al obtener stats:", error);
    res.status(500).send({ status: 'ERROR', message: 'Error al obtener stats' });
  }
}

const getCantidadCategoriasGastos= async (req, res) => {
  try {
    const stats = await statsRegistrosService.getCantidadCategoriasTipo(req.userUuid, 'gasto');
    res.send( stats )
  } catch (e) {
    console.error("Error al obtener stats:", error);
    res.status(500).send({ message: 'Error al obtener stats' });
  }
}

const getCantidadCategoriasIngresos= async (req, res) => {
  try {
    const stats = await statsRegistrosService.getCantidadCategoriasTipo(req.userUuid, 'ingreso');
    res.send( stats )
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
