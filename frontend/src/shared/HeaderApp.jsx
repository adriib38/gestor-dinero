import {RegistrosContext} from "../context/RegistrosContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Badge } from "@mui/material";

function HeaderApp() {

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
            <NavLink
              className={({ isActive }) => {
                return isActive ? "isActive" : "";
              }}
              to="/list"
            >
              Registros
            </NavLink>
          </li>
          <li>
            <Badge badgeContent={numRegistros} color="secondary">
              <NavLink
                id="nav-crear-registro"
                className={({ isActive }) => {
                  return isActive ? "isActive" : "";
                }}
                to="/new"
              >
                Crear registro
              </NavLink>
            </Badge>
          </li>
        </div>
      </ul>
    </header>
  );
}

export default HeaderApp;
