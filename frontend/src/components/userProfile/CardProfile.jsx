function CardProfile({ title, body, width = "650px" }) {

  const style = {
    background: "white",
    padding: "25px 35px",
    border: ".5px solid rgb(219, 219, 219)",
    borderRadius: "12px",
    width: width,
    marginBottom: "20px",
    boxShadow: "1px 1px 1px 0px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <article style={style}>
      <h2 style={{ fontSize: "1.2rem" }}>{title}</h2>
      <div>{body}</div>
    </article>
  );
}

export default CardProfile;
