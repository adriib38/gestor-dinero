import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import Dashboard from "../shared/Dashboard"
import { getStatsResume as getStatsResumeService } from "../services/RegistrosService"
import { RegistrosContextProvider } from '../context/RegistrosContext';

function Inicio() {
  const [statsResume, setStatsResume] = useState([]);

  const getStatsResume = async () => {
    try {
      const resp = await getStatsResumeService();
      if(resp.status == 200) {
        setStatsResume(resp.data)
      }
    } catch (error) {
      console.error("Failed to fetch stats resume:", error);
    }
  };

  useEffect(() => {
    getStatsResume();
  }, []);

  const styles = {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    marginTop: "40px",
    justifyContent: "center",
  };

  return (
    <div style={{ width: '90%' }}>
      <h1>📈 App gestión de Gastos e ingresos.</h1>

      <section style={styles}>
        {Object.entries(statsResume).map(([key, value]) => (
          <StatsCard key={key} title={key} value={value} />
        ))}
      </section>
      <RegistrosContextProvider>
        <Dashboard />
      </RegistrosContextProvider>

    </div>
  );
}

export default Inicio;
