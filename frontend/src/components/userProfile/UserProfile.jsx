import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import CardProfile from "./CardProfile";
import styled from "styled-components";
import { deleteUser } from "../../services/AuthService";

const Button = styled.button`
  font-weight: 400;
  font-size: 0.7em;
  font-size: 1em;
  height: 100%;
  background-color: #18181b;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 5px;
  transition: background-color 0.3s, color 0.3s;
  font-family: Inter, system-ui;

  &:hover {
    background-color: #333333;
    color: #ffffff;
  }
`;

const ButtonRed = styled(Button)`
  background-color: #f3f3f3;
  color: #000;
  border: 1px solid #bb0000;

  &:hover {
    background-color: #bb0000;
    color: #ffffff;
  }
`;

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const handlerBorrarCuenta = async () => {
  if (confirm("¿Eliminar cuenta? Toda la información se eliminará.") == true) {
    alert("Bye! :)");
    
    const exito = await deleteUser();
    if(exito) { location.reload() }
  }
}

const UserProfile = () => {
  const { userInfo } = useContext(AuthContext);
  console.log(userInfo);

  return (
    <>
      <Section>
        <CardProfile
          title="Información del usuario"
          body={
            <div>
              <label htmlFor="name">Nombre</label>
              <input type="text" readOnly id="name" value={userInfo.username} />

              <label htmlFor="createdat">Fecha creación</label>
              <input type="text" readOnly id="createdat" value={userInfo.created_at} />
            </div>
          }
        />
        <CardProfile
          title="Configuración de la cuenta"
          body={
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Button>Términos y condiciones</Button>
              <Button>Politica de privacidad</Button>
            </div>
          }
        />
      </Section>
      <Section>
        <CardProfile
          title="Zona de peligro"
          width="600px"
          body={
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ButtonRed onClick={handlerBorrarCuenta}>Borrar cuenta</ButtonRed>
              <ButtonRed>Borrar datos</ButtonRed>
            </div>
          }
        />
      </Section>
    </>
  );
};

export default UserProfile;
