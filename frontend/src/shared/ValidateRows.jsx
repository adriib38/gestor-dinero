export const validateRow = (row) => {
  const errors = [];

  if (!row.categoria || row.categoria.length < 1) {
    errors.push('La categoría es requerida');
  }
  if (!row.concepto || row.concepto.length < 1) {
    errors.push('El concepto es requerido');
  }
  if (!row.tipo || row.tipo.length < 1) {
    errors.push('El tipo es requerido');
  }
  if (!row.observaciones || row.observaciones.length < 1) {
    errors.push('Las observaciones son requeridas');
  }
  if (!row.cantidad || row.cantidad < 1) {
    errors.push('La cantidad es requerida');
  }

  console.log('Validation result:', errors.length); // Corrige la forma en que se imprime el resultado de la validación

  return errors;
};
