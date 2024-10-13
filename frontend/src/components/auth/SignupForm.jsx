import { useContext, useState } from "react";
import { AuthContext } from '../../context/AuthContext';
import { LinearProgress } from "@mui/material";

function SignupForm() {
  const [ msgRegister, setMsgRegister ] = useState("");
  const [ cargando, setCargando] = useState(false);
  const { register } = useContext(AuthContext)

  const handlerForm = async (e) =>{
    e.preventDefault();
    setCargando(true)
    const requestRegister = {
      "username": e.target.username.value,
      "password": e.target.password.value,
      "passwordRepeat": e.target.passwordRepeat.value
    }

    const resp = await register(requestRegister);
    if (resp.register === false) {
      setMsgRegister(resp.message);
    } else {
      setMsgRegister("Register successful!");
    }
    setCargando(false);
  }
 
  return (
    <form
      onSubmit={handlerForm}
    >
      <h2>Registro</h2>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" placeholder="adrian" required />

      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" required/>

      <label htmlFor="password">Repeat password</label>
      <input type="password" name="passwordRepeat" id="passwordRepeat" required/>

      <button style={{background: '#17769b'}} type="submit">Login</button>
      {cargando ? <LinearProgress/> : ''}
      <p>{ msgRegister }</p>
    </form>
  );
}

export default SignupForm;
