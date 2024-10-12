import { useEffect, useState, useContext } from "react";
import StatsCard from "./StatsCard";
import Dashboard from "../shared/Dashboard"
import { getStatsResume as getStatsResumeService } from "../services/RegistrosService"
import { RegistrosContextProvider } from '../context/RegistrosContext';
import { AuthContext } from "../context/AuthContext";
import SkeletonGrid from "../shared/SkeletonGrid";

function Inicio() {
  const [statsResume, setStatsResume] = useState(false);
  const { userInfo } = useContext(AuthContext);
  
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
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Buenos días { userInfo.username }, tu resumen financiero.</h1>

      {
        !statsResume ? (<SkeletonGrid />)
        :
        (
          <section style={styles}>
            {Object.entries(statsResume).map(([key, value]) => (
              <StatsCard key={key} title={key} value={value} />
            ))}
          </section>
        )
      }

      <RegistrosContextProvider>
        <Dashboard />
      </RegistrosContextProvider>

    </div>
  );
}

export default Inicio;
