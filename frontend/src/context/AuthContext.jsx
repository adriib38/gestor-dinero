import { createContext, useEffect, useState } from "react";
import { login as loginService, logout as logoutService, user as checkAuthStatus } from "../services/AuthService";
import { validateUsername, validatePassword } from '../utils';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthContextProvider(props) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        userLogged();
    }, []);

    const login = async (requestLogin) => {
        if (!validateUsername(requestLogin.username)) {
            return { login: false, message: "Username must be a string between 3 and 20 characters." };
        }
        if (!validatePassword(requestLogin.password)) {
            return { login: false, message: "Password must be a string between 8 and 15 characters." };
        }

        try {
            const resp = await loginService(requestLogin);

            if (resp.status === 200) {
                setIsAuthenticated(true);
                navigate("/");
                window.location.reload();
                return { login: true };
            } else if (resp.status === 404) {
                return { login: false, message: "Usuario no encontrado." };
            } else if (resp.status === 401) {
                return { login: false, message: "Contraseña incorrecta" };
            }
        } catch (error) {
            console.log({
                message: `Error al obtener registros`,
                type: 'error',
                key: Date.now(),
            });
            return { login: false, message: "Error en el servidor" };
        }
    };

    const logout = async () => {
        try {
            const resp = await logoutService();

            if (resp.status === 200) {
                setIsAuthenticated(false);
                window.location.reload();
                return { logout: true };
            } else {
                return { logout: false, message: "Error al cerrar sesión" };
            }
        } catch (error) {
            console.log({
                message: `Error al cerrar sesión`,
                type: 'error',
                key: Date.now(),
            });
            return { logout: false, message: "Error en el servidor" };
        }
    };

    const userLogged = async () => {
        try {
            const resp = await checkAuthStatus();

            if (resp.status === 200) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.log({
                message: `Error userLogged`,
                type: 'error',
                key: Date.now(),
            });
            setIsAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
