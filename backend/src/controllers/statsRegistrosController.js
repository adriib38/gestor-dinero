const registrosService = require('../services/statsRegistrosService');

const getStats = async (req, res) => {
  const stats = await registrosService.getStats();
  console.log(stats.lenght)
  res.send({ status: 'OK', data: stats})
}


module.exports = {
  getStats
};
