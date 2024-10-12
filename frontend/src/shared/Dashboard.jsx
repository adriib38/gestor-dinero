import { useContext } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { RegistrosContext } from '../context/RegistrosContext';
import CardChart from "../shared/CardChart/CardChart";
import BarChartMeses from "./CardChart/BarChartMeses";

function Dashboard() {

  const { cantidadCategoriasGastos, cantidadCategoriasIngresos } = useContext(RegistrosContext);

  const sectionStyle = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: "30px",
    marginTop: "40px",
  };

  const cardChartStyles = {
    flex: "1"
  };

  const chartConfig = {
    height: 230,
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
        padding: -10
      }
    }
  }

  return (
    <section style={sectionStyle}>
      <div style={{display: "flex", flexDirection: 'row', justifyContent: "space-between"}}>
        <div style={cardChartStyles}>
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
          ></CardChart>
        </div>

        <div style={cardChartStyles}>
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
              />
            }
          ></CardChart>
        </div>

      </div>

      <BarChartMeses></BarChartMeses>

      
    </section>
  );
}

export default Dashboard;