import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useContext } from "react";
import { RegistrosContext } from "../../context/RegistrosContext";
import { useMemo, useState } from "react";
import "./index.css";


const chartSetting = {
  height: 450,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
    
    },
  },
};


const ButtonChangeYear = {
  background: '#1976D2',
  padding: '10px',
  color: 'white',
  bordeRadius: '4px',
  border: 'none',
  width: '30px',
  cursor: 'pointer'
}

const valueFormatter = (cantidad) => `${cantidad}€`;

function BarChartMeses() {
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear());

  const handleSelectedYear = (sum) => {
    if (sum) setYearSelected(yearSelected + 1);
    else setYearSelected(yearSelected - 1);
    console.log(yearSelected);
  };

  const { registros } = useContext(RegistrosContext);

  const allMonths = useMemo(() => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const month = new Date(yearSelected, i).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      months.push(month);
    }
    return months;
  }, [yearSelected]);

  const dataGroupedByMonth = useMemo(() => {
    const groupedData = {};

    registros.forEach((registro) => {
      const month = new Date(registro.created_at).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      if (!groupedData[month]) {
        groupedData[month] = { gasto: 0, ingreso: 0 };
      }

      if (registro.tipo === "gasto") {
        groupedData[month].gasto += registro.cantidad;
      } else if (registro.tipo === "ingreso") {
        groupedData[month].ingreso += registro.cantidad;
      }
    });

    return allMonths.map((month) => ({
      month,
      gasto: groupedData[month]?.gasto || 0,
      ingreso: groupedData[month]?.ingreso || 0,
    }));
  }, [registros, allMonths]);

  return (
    <article id="barChartMeses" className="cardChart-article">
      <header className="cardChart-header">
        <p>Comparación {yearSelected}</p>       
        <button onClick={() => handleSelectedYear(true)}>+</button>
        <button onClick={() => handleSelectedYear(false)}>-</button>
      </header>

      <BarChart
        dataset={dataGroupedByMonth}
        xAxis={[{ scaleType: "band", dataKey: "month" }]}
        series={[
          { dataKey: "gasto", label: "Gasto", color: "#e0274c", valueFormatter },
          {
            dataKey: "ingreso",
            label: "Ingreso",
            color: "#27e058",
            valueFormatter,
          },
        ]}
        {...chartSetting}
      />
    </article>
  );
}

export default BarChartMeses;