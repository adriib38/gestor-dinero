import Skeleton from '@mui/material/Skeleton';

const styleSection = {
  display: "flex",
  flexWrap: "wrap",
  gap: "30px",
  marginTop: "40px",
};

const styleCard = {
  padding: '20px',
  border: '.5px solid rgb(219, 219, 219)',
  borderRadius: '12px',
  maxWidth: '300px',
  height: '90px',
  marginBottom: '20px',
  flex: '1 1 calc(33.333% - 20px)',
  boxSizing: 'border-box'
}

const SkeletonGrid = () => {

  return (
    <section style={styleSection}>

      <Skeleton style={styleCard} animation="wave" variant="circular"  />
      <Skeleton style={styleCard} animation="wave" variant="circular"  />
      <Skeleton style={styleCard} animation="wave" variant="circular"  />
      <Skeleton style={styleCard} animation="wave" variant="circular"  />

      <Skeleton style={styleCard} animation="wave" variant="circular"  />
      <Skeleton style={styleCard} animation="wave" variant="circular"  />
      <Skeleton style={styleCard} animation="wave" variant="circular"  /> 

    </section>
  )
};
  
  export default SkeletonGrid