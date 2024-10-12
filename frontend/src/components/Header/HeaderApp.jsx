import { RegistrosContext } from "../../context/RegistrosContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Badge } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { MenuUser } from "../../components/Header/MenuUser";

function HeaderApp() {
  const { isAuthenticated } = useContext(AuthContext);
  const { numRegistros } = useContext(RegistrosContext);

  const navRightStyle = {
    display: "flex",
    alignItems: "center",
    gap: 30,
  };

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
        <div className="nav-right" style={navRightStyle}>
          <li>
            {isAuthenticated && (
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
            )}
          </li>
          <li>
            {isAuthenticated && (
              <NavLink
                id="nav-crear-registro"
                className={({ isActive }) => {
                  return isActive ? "isActive" : "";
                }}
                to="/new"
              >
                Crear registro
              </NavLink>
            )}
          </li>
          <li>{isAuthenticated && <MenuUser />}</li>
          <li>
          {!isAuthenticated && (
            <NavLink id="nav-login" to="/login">
              Login
            </NavLink>
          )}
          </li>
          <li>
          {!isAuthenticated && (
            <NavLink id="nav-register" to="/register">
              Register
            </NavLink>
          )}
          </li>
        </div>
      </ul>
    </header>
  );
}

export default HeaderApp;
