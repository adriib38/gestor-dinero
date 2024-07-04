import RegisterTypeDot from '../RegisterTypeDot';
import './index.css'

function CardChart({ title, chart, type }) {

  return (
    <article className='cardChart-article'>
      <header className='cardChart-header'>
        {type && <RegisterTypeDot t={type} />}  
        <h2>{title}</h2>
      </header>
      {chart}
    </article>
  );
}

export default CardChart;
