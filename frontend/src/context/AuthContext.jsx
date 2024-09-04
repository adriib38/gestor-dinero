import { createContext, useEffect, useState } from "react";
import {
  login as loginService,
  logout as logoutService,
  user as checkAuthStatus,
} from "../services/AuthService";
import { validateUsername, validatePassword } from "../utils";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthContextProvider(props) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userLogged();
  }, []);

  const login = async (requestLogin) => {
    if (!validateUsername(requestLogin.username)) {
      return {
        login: false,
        message: "Username must be a string between 3 and 20 characters.",
      };
    }
    if (!validatePassword(requestLogin.password)) {
      return {
        login: false,
        message: "Password must be a string between 8 and 15 characters.",
      };
    }

    try {
      const resp = await loginService(requestLogin);

      if (resp.status === 200) {
        setUserInfo(resp.data.user);
        setIsAuthenticated(true);
        navigate("/");
        return { login: true };
      } else if (resp.status === 404) {
        return { login: false, message: "Usuario no encontrado." };
      } else if (resp.status === 401) {
        return { login: false, message: "Contraseña incorrecta" };
      }
    } catch (error) {
      console.error("Error al obtener registros", error);
      return { login: false, message: "Error en el servidor" };
    }
  };

  const logout = async () => {
    try {
      const resp = await logoutService();

      if (resp.status === 200) {
        setIsAuthenticated(false);
        return { logout: true };
      } else {
        return { logout: false, message: "Error al cerrar sesión" };
      }
    } catch (error) {
      console.error({
        message: `Error al cerrar sesión`,
        type: "error",
        key: Date.now(),
      });
      return { logout: false, message: "Error en el servidor" };
    }
  };

  const userLogged = async () => {
    setLoading(true);
    try {
      const resp = await checkAuthStatus();
      if (resp.status === 200) {
        setIsAuthenticated(true);
        setUserInfo(resp.data.user);
      } else {
        setIsAuthenticated(false);
        setUserInfo({});
      }
    } catch (error) {
      console.error('Error al verificar la sesión del usuario:', error);
      setIsAuthenticated(false);
      setUserInfo({});
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        userInfo,
        loading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
