function RegisterTypeDot ({ t }) {
    let color = t.toLowerCase() === 'ingreso' ? 'green' : 'red';
    
    const spanStyle = {
      display: 'inline-block',
      backgroundColor: color,
      borderRadius: '50%',
      width: '10px',
      height: '10px',
      marginRight: '5px'
    };

    return (
      <span style={spanStyle}></span>
    );
}

export default RegisterTypeDot;
