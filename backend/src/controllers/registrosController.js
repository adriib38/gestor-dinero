const Registro = require("../models/Registro");


const getAllRegistros = (req, res) => {
  Registro.getAllRegistros((err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error getting registros", error: err });
    } else {
      return res.status(200).json(results);
    }
  });
};

const getRegistroById = (req, res) => {
  Registro.getRegistroById(req.params.id, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error getting registro", error: err });
    } else {
      return res.status(200).json(results[0]);
    }
  });
};

const getRegistroByCategory = (req, res) => {
  Registro.getRegistroByCategory(req.params.categoria, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error getting registros", error: err });
    } else {
      return res.status(200).json(results);
    }
  });
};

const updateRegistro = (req, res) => {
  const { body } = req;

  if (
    !body.concepto &&
    !body.observaciones &&
    !body.categoria &&
    !body.tipo &&
    !body.cantidad
  ) {
    return res
      .status(400)
      .send({ status: "ERROR", data: "No fields provided for update" });
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

  Registro.updateRegistro(req.params.id, newRegistro, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error updating registros", error: err });
    } else {
      return res
        .status(200)
        .json({ message: "Updated succesfull", newRegistro });
    }
  });
};

const createRegistro = (req, res) => {
  const { body } = req;
  if (
    !body.concepto ||
    !body.observaciones ||
    !body.categoria ||
    !body.tipo ||
    !body.cantidad
  ) {
    return res.status(400).json({ message: "No fields provided for update" });
  }

  const newRegistro = {
    concepto: body.concepto,
    observaciones: body.observaciones,
    categoria: body.categoria,
    tipo: body.tipo,
    cantidad: body.cantidad,
  };

  Registro.createRegistro(newRegistro, req.userUuid, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error creating registro", error: err });
    } else {
      return res
        .status(201)
        .json({ message: "Created succesfull", newRegistro });
    }
  });
};

const deleteRegistro = async (req, res) => {
  const { id } = req.params;
  const userIdFromToken = req.userUuid;
  try {
    Registro.getRegistroById(id, (err, registro) => {
      if (err) {
        return res.status(500).json({ message: "Error getting registro", error: err });
      }

      if (!registro) {
        return res.status(404).json({ message: "Registro not found" });
      }

      //User and author are not the same
      if (registro.userId !== userIdFromToken) {
        return res.status(403).json({ message: "You are not authorized to delete this registro" });
      }

      Registro.deleteRegistro(id, (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Error deleting registro", error: err });
        }
        return res.status(200).json({ message: "Registro deleted successfully" });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};


const getRegistrosFromUser = (req, res) => {
  Registro.getRegistrosFromUser(req.userUuid, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error getting registros" });
    } else {
      return res.status(200).json(results);
    }
  });
};


module.exports = {
  getRegistroById,
  getRegistroByCategory,
  getAllRegistros,
  updateRegistro,
  createRegistro,
  deleteRegistro,
  getRegistrosFromUser
};
