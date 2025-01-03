import { Route, Routes } from "react-router-dom";
import "./styles/App.scss";
import { Chartjs } from "./charts/Chartjs";
import { Navbar } from "./Navbar";
import { D3 } from "./charts/D3";
import { PlotlyChart } from "./charts/Plotly";
import { LineChartMui } from "./charts/LineChartMui";
import { Echarts } from "./charts/Echarts";
import { Rechart } from "./charts/Rechart";
import { RechartCustom } from "./charts/RechartCustom";
import { ApexCharts } from "./charts/ApexCharts";


function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/mui/line-chart" element={<LineChartMui />} />
          <Route path="/chartjs/line-chart" element={<Chartjs />} />
          <Route path="/echarts/line-chart" element={<Echarts/>} />
          <Route path="/D3" element={<D3 />} />
          <Route path="/Plotly" element={<PlotlyChart />} />
          <Route path="/rechart/line-chart" element={<Rechart />} />
          <Route path="/rechart/line-chart-custom" element={<RechartCustom/>} />
          <Route path="/apexcharts/line-chart" element={<ApexCharts/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
