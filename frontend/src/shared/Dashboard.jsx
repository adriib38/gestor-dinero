import { useContext } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { RegistrosContext } from '../context/RegistrosContext';
import CardChart from "../shared/CardChart/CardChart";

function Dashboard() {

  const { cantidadCategoriasGastos, cantidadCategoriasIngresos } = useContext(RegistrosContext);

  const styles = {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    marginTop: "40px",
  };

  const chartConfig = {
    width: 320,
    height: 400,
    sx: {
      [`& .${pieArcLabelClasses.root}`]: {
        fill: "white",
      },
    },
    colors: ["#EFEA5A", "#048BA8", "#A4036F", "#F29E4C", "#16DB93"],
    slotProps : {
      legend: {
        direction: 'column',
        position: { vertical: 'middle', horizontal: 'right' },
        padding: -40,
      }
    }
  }

  return (
    <section style={styles}>
      <CardChart
        type={"Gasto"}
        title={"Gastos por categoría"}
        chart={
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.value}€`,
                data: cantidadCategoriasGastos,
              },
            ]}
            sx={chartConfig.sx}
            colors={chartConfig.colors}
            slotProps={chartConfig.slotProps}
            width={chartConfig.width}
            height={chartConfig.height}
            padding={chartConfig.padding}
          />
        }
      />

      <CardChart
        type={"Ingreso"}
        title={"Ingresos por categoría"}
        chart={
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.value}€`,
                data: cantidadCategoriasIngresos,
              },
            ]}
            sx={chartConfig.sx}
            slotProps={chartConfig.slotProps}
            colors={chartConfig.colors}
            width={chartConfig.width}
            height={chartConfig.height}
            padding={chartConfig.padding}
          />
        }
      />
    </section>
  );
}

export default Dashboard;
