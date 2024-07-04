import { useEffect, useState, useCallback } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import CardChart from "../shared/CardChart/CardChart";

function Dashboard() {
  const [cantidadCategoriasGastos, setCantidadCategoriasGastos] = useState([]);
  const [cantidadCategoriasIngresos, setCantidadCategoriasIngresos] = useState([]);

  const getCantidadCategorias = useCallback(async (tipo) => {
    try {
      
      const url = `http://localhost:3000/api/v1/stats/cantidadCategorias${tipo}`;
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await resp.json();
      if (data && data.data) {
        const formattedData = data.data.map((item) => ({
          id: item.id,
          value: item.value,
          label: item.label,
        }));
        if (tipo === "gastos") {
          setCantidadCategoriasGastos(formattedData);
        } else if (tipo === "ingresos") {
          setCantidadCategoriasIngresos(formattedData);
        }
      } else {
        console.error("Invalid response format:", data);
      }
    } catch (error) {
      console.error(`Failed to fetch cantidad categorias ${tipo}:`, error);
    }
  }, []);

  useEffect(() => {
    getCantidadCategorias("gastos");
    getCantidadCategorias("ingresos");
  }, [getCantidadCategorias]);

  const styles = {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    marginTop: "40px",
    justifyContent: "center",
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
