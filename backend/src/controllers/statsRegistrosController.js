const registrosService = require('../services/statsRegistrosService');

const getStats = async (req, res) => {
  const stats = await registrosService.getStats();
  res.send({ status: 'OK', data: stats})
}

const getCantidadCategoriasGastos = async (req, res) => {
  const stats = await registrosService.getCantidadCategoriasGastos();
  res.send({ status: 'OK', data: stats})
}

module.exports = {
  getStats,
  getCantidadCategoriasGastos
};
