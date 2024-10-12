import { useContext, useState } from "react";
import { AuthContext } from '../../context/AuthContext';
import { LinearProgress } from "@mui/material";

function SigninForm() {
  const [msgLogin, setMsgLogin] = useState("");
  const [ cargando, setCargando] = useState(false);
  const { login } = useContext(AuthContext)

  const handlerForm = async (e) =>{
    e.preventDefault();
    setCargando(true)
    const requestLogin = {
      "username": e.target.username.value,
      "password": e.target.password.value
    }

    const resp = await login(requestLogin);
    if (resp.login === false) {
      setMsgLogin(resp.message);
    } else {
      setMsgLogin("Login successful!");
    }
    setCargando(false);
  }
 
  return (
    <form
      onSubmit={handlerForm}
    >
      <h2>Inicio sesión</h2>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" placeholder="adrian" required />

      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" required/>

      <button style={{background: '#17769b'}} type="submit">Login</button>
      {cargando ? <LinearProgress/> : ''}
      <p>{ msgLogin }</p>
    </form>
  );
}

export default SigninForm;
