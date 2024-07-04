import React from 'react'

function StatsCard({title, value}) {

  const styles = {
    background: 'white',
    padding: '20px',
    border: '1px #ccc solid',
    flex: '2 2 300px',
    maxWidth: '300px',
    marginBottom: '20px'
  }

  return (
    <article style={styles}>
        <h2>{value}</h2>
        <p>{title}</p>
    </article>
  )
}

export default StatsCard