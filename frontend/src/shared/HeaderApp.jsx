import { RegistrosContext } from "../context/RegistrosContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Badge } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

function HeaderApp() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { numRegistros } = useContext(RegistrosContext);

  return (
    <header id="header-navbar">
      <h1>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "isActive" : "";
          }}
          to="/"
        >
          CashFlow
        </NavLink>
      </h1>
      <ul>
        <div className="nav-right">
          <li>
            <Badge badgeContent={numRegistros} color="secondary">
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "isActive" : "";
                }}
                to="/list"
              >
                Registros
              </NavLink>
            </Badge>
          </li>
          <li>
            <NavLink
              id="nav-crear-registro"
              className={({ isActive }) => {
                return isActive ? "isActive" : "";
              }}
              to="/new"
            >
              Crear registro
            </NavLink>
          </li>
          <li>
            {isAuthenticated ? (
              <button id="nav-logout" onClick={logout}>
                Logout
              </button>
            ) : (
              <NavLink id="nav-login" to="/login">
                Login
              </NavLink>
            )}
          </li>
        </div>
      </ul>
    </header>
  );
}

export default HeaderApp;
