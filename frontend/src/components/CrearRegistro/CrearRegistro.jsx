import { useContext, useEffect, useState, useCallback  } from "react";
import { RegistrosContext } from '../../context/RegistrosContext';
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./style.css"

function CrearRegistro() {
  const [open, setOpen] = useState(false);
  const { crearRegistro, feedback } = useContext(RegistrosContext)

  const [buttonDisabled, setButtonbuttonDisabled] = useState(true)
  const [formState, setFormState] = useState({
    concepto: "",
    categoria: "",
    tipo: "",
    cantidad: 0,
    observaciones: ""
  })
  
  const validForm = useCallback(() => {
    const { concepto, categoria, tipo, cantidad, observaciones } = formState;
    let valid = concepto && categoria && tipo && cantidad && cantidad > 0 && observaciones;
    if (valid) {
      setButtonbuttonDisabled(false) 
    } else {
      setButtonbuttonDisabled(true);
    }
  
  }, [formState]);
  
  
  useEffect(() => {
    validForm()
  }, [formState, validForm])
  
  const handlerForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState({
      ...formState, [name]: value
    })
  }

  const handlerCrearRegistro = async (e) => {
    e.preventDefault();
    
    const nuevoRegistro = {
      'concepto': e.target.concepto.value,
      'categoria': e.target.categoria.value,
      'tipo': e.target.tipo.value,
      'cantidad': e.target.cantidad.value,
      'observaciones': e.target.observaciones.value
    }
    
    const exito = await crearRegistro(nuevoRegistro);
    if(exito){
      setFormState({
        concepto: "",
        categoria: "",
        tipo: "",
        cantidad: 0,
        observaciones: ""
      })
      setOpen(true);
    }
  }

  const handleClose = (event, reason) => {
    console.log('reason', reason)
    //No cerrar Snack cuando se hace clic fuera del Snack
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
          {feedback.message}. <Link to="/list">Lista registros</Link>.
        </Alert>
      </Snackbar>

      <h1>Crear registro</h1>

      <form 
        id="form-crear-registro"
        onSubmit={handlerCrearRegistro}
      >
        <div className="form-grup">
          <label htmlFor="concepto">Concepto</label>
          <input type="text" id="concepto" name="concepto" placeholder="Compra semanal" required onChange={handlerForm} value={formState.concepto} />

          <label htmlFor="categoria">Categoría</label>
          <input type="text" id="categoria" name="categoria" placeholder="Compra" required onChange={handlerForm} value={formState.categoria} />

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cantidad">Cantidad</label>
              <input type="number" id="cantidad" name="cantidad" required onChange={handlerForm} value={formState.cantidad} />
            </div>
            <div className="form-group">
              <fieldset className="radio-group">
                <legend>Tipo de registro</legend>
                <div className="radio-option">
                  <input type="radio" id="gasto" name="tipo" value="gasto" required onChange={handlerForm} checked={ formState.tipo == 'gasto'}></input>
                  <label htmlFor="gasto">Gasto</label>
                </div>
                <div className="radio-option">
                  <input type="radio" id="ingreso" name="tipo" value="ingreso" onChange={handlerForm} checked={ formState.tipo == 'ingreso'}></input>
                  <label htmlFor="ingreso">Ingreso</label>
                </div>
              </fieldset>
            </div>
          </div>

          <label htmlFor="observaciones">Observaciones</label>
          <textarea name="observaciones" id="observaciones" placeholder="Compra semanal en Carrefour" required onChange={handlerForm} value={formState.observaciones}></textarea>

          <button type="submit" disabled={buttonDisabled}>Crear</button>
        </div>
      </form>
    </div>
  )
}

export default CrearRegistro