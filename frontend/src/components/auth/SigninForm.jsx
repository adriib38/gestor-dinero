import { useContext, useState } from "react";
import { AuthContext } from '../../context/AuthContext';

function SigninForm() {
  const [msgLogin, setMsgLogin] = useState("");
  const { login } = useContext(AuthContext)

  const handlerForm = async (e) =>{
    e.preventDefault();

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
      <p>{ msgLogin }</p>
    </form>
  );
}

export default SigninForm;
