import { createContext } from "react";
import { login as loginService } from "../services/AuthService";
import { validateUsername, validatePassword } from '../utils';

export const AuthContext = createContext();

export function AuthContextProvider(props) {

    const login = async (requestLogin) => {
        if (!validateUsername(requestLogin.username)) return({ login: false, message: "Username must be a string between 3 and 20 characters." })
        if (!validatePassword(requestLogin.password)) return({ login: false, message: "Password must be a string between 8 and 15 characters." })

        try {
            const resp = await loginService(requestLogin);
 
            if (resp.status === 200) {
                return({ login: true })
            } else if (resp.status === 404) {
                return({ login: false, message: "Usuario no encontrado." })
            } else if (resp.status === 401) {
                return({ login: false, message: "Contraseña incorrecta" })
            }
        } catch (error) {
            console.log({
                message: `Error al obtener registros`,
                type: 'error',
                key: Date.now(),
            });
            return false;
        }
  

        
    };


    return (
        <AuthContext.Provider
            value={{
                login
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}