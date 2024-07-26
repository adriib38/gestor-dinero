import Inicio from "./components/Inicio";
import ListaRegistros from "./components/ListaRegistros/ListaRegistros";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import "./index.css";
import CrearRegistro from "./components/CrearRegistro/CrearRegistro";
import { RegistrosContextProvider } from "./context/RegistrosContext";
import SigninForm from "./components/auth/SigninForm";
import HeaderApp from "./shared/HeaderApp";
import { AuthContextProvider } from "./context/AuthContext";

function App() {

  function NotFound() {
    return <h1>404</h1>;
  }

  return (
    <BrowserRouter>
      <RegistrosContextProvider>
        <AuthContextProvider>
          <HeaderApp></HeaderApp>
        </AuthContextProvider>
      </RegistrosContextProvider>

      <div id="content">
        <Routes>
          <Route path="/" element={<Inicio />}></Route>

          <Route
            path="/list"
            element={
              <RegistrosContextProvider>
                <ListaRegistros />
              </RegistrosContextProvider>
            }
          ></Route>

          <Route
            path="/new"
            element={
              <RegistrosContextProvider>
                <CrearRegistro />
              </RegistrosContextProvider>
            }
          ></Route>

          <Route
            path="/login"
            element={
              <AuthContextProvider>
                <SigninForm />
              </AuthContextProvider>
            }
            ></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
