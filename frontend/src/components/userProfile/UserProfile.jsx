import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function UserProfile() {
  const { userInfo } = useContext(AuthContext);
  console.log(userInfo)
  return(
    <div style={{'background': 'red'}}>
      <h2>{userInfo.username}</h2>
      <p>Cuenta creada: {userInfo.created_at}</p>

      <div>
        <button>Eliminar</button>
      </div>
    </div>
  )
}


export default UserProfile;