const registrosService = require("../services/registrosService");

const getAllRegistros = async (req, res) => {
  try {
    const allRegistros = await registrosService.getAllRegistros();
    res.send({ status: "OK", data: allRegistros });
  } catch (e) {
    console.error("Error al obtener registros:", error);
    res
      .status(500)
      .send({ status: "ERROR", message: "Error al obtener registros" });
  }
};

const getRegistroById = async (req, res) => {
  try {
    const registroById = await registrosService.getRegistroById(req);
    res.send({ status: "OK", data: registroById });
  } catch (e) {
    console.error("Error al obtener registro:", error);
    res
      .status(500)
      .send({ status: "ERROR", message: "Error al obtener registro" });
  }
};

const getRegistroByCategory = async (req, res) => {
  try {
    const getRegistroByCategory = await registrosService.getRegistroByCategory(
      req
    );
    res.send({ status: "OK", data: getRegistroByCategory });
  } catch (e) {
    console.error("Error al obtener registros:", error);
    res
      .status(500)
      .send({ status: "ERROR", message: "Error al obtener registros" });
  }
};

const updateRegistro = async (req, res) => {
  const { body } = req;
  console.log(req.body);
  // Verifica si hay al menos un campo presente
  if (
    !body.concepto &&
    !body.observaciones &&
    !body.categoria &&
    !body.tipo &&
    !body.cantidad
  ) {
    res
      .status(400)
      .send({ status: "ERROR", data: "No fields provided for update" });
    return;
  }

  const newRegistro = {};

  if (body.concepto !== undefined) {
    newRegistro.concepto = body.concepto;
  }

  if (body.observaciones !== undefined) {
    newRegistro.observaciones = body.observaciones;
  }

  if (body.categoria !== undefined) {
    newRegistro.categoria = body.categoria;
  }

  if (body.tipo !== undefined) {
    newRegistro.tipo = body.tipo;
  }

  if (body.cantidad !== undefined) {
    newRegistro.cantidad = body.cantidad;
  }

  try {
    const updateRegistro = await registrosService.updateRegistro(
      req.params.id,
      newRegistro
    );
    res.status(200).send({ status: "OK", data: updateRegistro });
  } catch (error) {
    console.error("Error al actualizar registro:", error);
    res.status(500).send({ status: "ERROR", data: "Internal Server Error" });
  }
};

const createRegistro = async (req, res) => {
  try {
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

    res.send({ status: "OK", data: createRegistro });
  } catch (error) {
    console.error("Error al crear registro:", error);
    res.status(500).send({ status: "ERROR", data: "Internal Server Error" });
  }
};

const deleteRegistro = async (req, res) => {
  try {
    const deleteRegistro = await registrosService.deleteRegistro(req);
    if (deleteRegistro.affectedRows == 1) {
      res.send({ status: "OK", data: "Registro eliminado" });
    } else {
      res.status(404).send({ status: "ERROR", data: "Registro no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar registro:", error);
    res.status(500).send({ status: "error", data: "Internal Server Error" });
  }
};

module.exports = {
  getRegistroById,
  getRegistroByCategory,
  getAllRegistros,
  updateRegistro,
  createRegistro,
  deleteRegistro,
};
