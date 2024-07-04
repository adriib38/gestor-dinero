const registrosService = require('../services/statsRegistrosService');

const getStats = async (req, res) => {
  const stats = await registrosService.getStats();
  res.send({ status: 'OK', data: stats})
}

const getCantidadCategoriasGastos= async (req, res) => {
  const stats = await registrosService.getCantidadCategoriasTipo(req, res, 'gasto');
  res.send({ status: 'OK', data: stats})
}

const getCantidadCategoriasIngresos= async (req, res) => {
  const stats = await registrosService.getCantidadCategoriasTipo(req, res, 'ingreso');
  res.send({ status: 'OK', data: stats})
}

module.exports = {
  getStats,
  getCantidadCategoriasGastos,
  getCantidadCategoriasIngresos
};
