import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import Dashboard from "../shared/Dashboard"
import { getStatsResume as getStatsResumeService } from "../services/Services"

function Inicio() {
  const [statsResume, setStatsResume] = useState([]);

  const getStatsResume = async () => {
    try {
      const resp = await getStatsResumeService();
      if(resp.status == 'OK') {
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

      <Dashboard></Dashboard>
    </div>
  );
}

export default Inicio;
