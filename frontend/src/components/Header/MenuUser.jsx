import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function EntidadLi({children, style, ...rest}) {
  const liStyle = {
    padding: "10px 15px",
  }

  const combinatedStyle = {...liStyle, ...style}
  return <li style={combinatedStyle}{...rest}>{children}</li>
 
}

export function MenuUser() {
  const { userInfo, logout, loading } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const srcImage = `https://api.dicebear.com/9.x/avataaars/svg?seed=${userInfo.username}`;


  const imgProfileStyle = {
    borderRadius: "50%",
    width: 50,
    border: "1px solid blue",
  };

  const ulStyle = {
    fontSize: ".8em",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "92%",
    background: "#fff",
    border: "3px solid whitesmoke",
    borderRadius: 6,
    width: "6%"
  }

  if (loading) {  
    return <div>...</div>;
  }

  const handleClick = () => {
    setOpen(!open);
  };

  document.addEventListener("click", (e) =>{
    let ele = e.explicitOriginalTarget
    if(open && ele.id != "user-menu" && ele.id != "img-user"){
      setOpen(false)
    }
  })

  return (
    <div>
      <img 
        id="img-user"
        onClick={handleClick} style={imgProfileStyle} src={srcImage}></img>
      {open && (
        <ul
          id="user-menu"
          style={ulStyle}
        >
          <EntidadLi>@{userInfo.username}</EntidadLi>
          <hr></hr>
          <EntidadLi style={{ color: "red", cursor: "pointer" }} onClick={logout}>
              Logout 
          </EntidadLi>
        </ul>
      )}
    </div>
  );
}
