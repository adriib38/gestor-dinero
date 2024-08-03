import Inicio from "./components/Inicio";
import ListaRegistros from "./components/ListaRegistros/ListaRegistros";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import "./index.css";
import CrearRegistro from "./components/CrearRegistro/CrearRegistro";
import { RegistrosContextProvider } from "./context/RegistrosContext";
import SigninForm from "./components/auth/SigninForm";
import HeaderApp from "./components/Header/HeaderApp";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./shared/ProtectedRoute";
import PublicRoute from "./shared/PublicRoute";

function App() {

  function NotFound() {
    return <h1>404</h1>;
  }

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <RegistrosContextProvider>
          <HeaderApp />
          <div id="content">
            <Routes>
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Inicio />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/list"
                element={
                  <ProtectedRoute>
                    <ListaRegistros />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/new"
                element={
                  <ProtectedRoute>
                    <CrearRegistro />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <SigninForm />
                  </PublicRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </RegistrosContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
