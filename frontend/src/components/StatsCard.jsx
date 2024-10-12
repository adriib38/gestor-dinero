function StatsCard({title, value}) {

  const styles = {
    background: 'white',
    padding: '20px',
    border: '.5px solid rgb(219, 219, 219)',
    borderRadius: '12px',
    maxWidth: '300px',
    height: '90px',
    marginBottom: '20px',
    boxShadow: '1px 1px 1px 0px rgba(0, 0, 0, 0.2)',
    flex: '1 1 calc(33.333% - 20px)',
    boxSizing: 'border-box'
  }

  return (
    <article style={styles}>
      <h2>{value}</h2>
      <p>{title}</p>
    </article>
  )
}

export default StatsCard