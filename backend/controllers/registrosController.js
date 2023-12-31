const registrosService = require('../services/registrosService');

const getAllRegistros = async (req, res) => {
  const allRegistros = await registrosService.getAllRegistros();

  res.send({ status: 'OK', data: allRegistros});
}

const getRegistroById = async (req, res) => {
  const registroById = await registrosService.getRegistroById(req);

  res.send({ status: 'OK', data: registroById});
}

const getRegistroByCategory = async (req, res) => {
  const getRegistroByCategory = await registrosService.getRegistroByCategory(req);

  res.send({ status: 'OK', data: getRegistroByCategory});
}


const updateRegistro = async (req, res) => {
  const { body } = req;

  // Verifica si hay al menos un campo presente
  if (!body.concepto && !body.observaciones && !body.categoria && !body.tipo && !body.cantidad) {
    res.status(400).send({ status: 'error', data: "No fields provided for update"});
    return;
  }

  const newRegistro = {
   
  };

  if(body.concepto !== undefined) {
    newRegistro.concepto = body.concepto;
  }

  if(body.observaciones !== undefined) {
    newRegistro.observaciones = body.observaciones;
  }
  
  if(body.categoria !== undefined) {
    newRegistro.categoria = body.categoria;
  }

  if(body.tipo !== undefined) {
    newRegistro.tipo = body.tipo;
  }

  if(body.cantidad !== undefined) {
    newRegistro.cantidad = body.cantidad;
  }

  try {
    const updateRegistro = await registrosService.updateRegistro(req.params.id, newRegistro);
    res.status(200).send({ status: 'OK', data: updateRegistro });
  } catch (error) {
    console.error("Error updating registro:", error);
    res.status(500).send({ status: 'error', data: "Internal Server Error" });
  }
}


const createRegistro = async (req, res) => {
  const { body } = req;

  if (
    !body.concepto ||
    !body.observaciones ||
    !body.categoria ||
    !body.tipo ||
    !body.cantidad
  ) {
    return;
  }

  const newRegistro = {
    concepto: body.concepto,
    observaciones: body.observaciones,
    categoria: body.categoria,
    tipo: body.tipo,
    cantidad: body.cantidad,
  };

  const createRegistro = await registrosService.createRegistro(newRegistro);

  res.send({ status: 'OK', data: createRegistro});
}

const deleteRegistro = async (req, res) => {
  const deleteRegistro = await registrosService.deleteRegistro(req);

  res.send({ status: 'OK', data: deleteRegistro});
}


module.exports = {
  getRegistroById,
  getRegistroByCategory,
  getAllRegistros,
  updateRegistro,
  createRegistro,
  deleteRegistro
};
