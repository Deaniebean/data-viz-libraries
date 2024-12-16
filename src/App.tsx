import { Route, Routes } from "react-router-dom";
import "./styles/App.scss";
import { Chartjs } from "./charts/Chartjs";
import { Navbar } from "./Navbar";
import { D3 } from "./charts/D3";
import { Plotly } from "./charts/Plotly";
import { LineChartMui } from "./charts/LineChartMui";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<LineChartMui />} />
          <Route path="/chartjs/line-chart" element={<Chartjs />} />
          <Route path="/D3" element={<D3 />} />
          <Route path="/Plotly" element={<Plotly />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
