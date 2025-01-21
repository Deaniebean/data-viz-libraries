import { Route, Routes } from "react-router-dom";
import "./styles/App.scss";
import { Navbar } from "./Navbar";
import { ApexChartsCustom } from "./charts/customLineChart/ApexChartsCustom";
import { LineChartMui } from "./charts/basicCharts/LineChartMui";
import { Echarts } from "./charts/basicCharts/Echarts";
import { Nivo } from "./charts/basicCharts/Nivo";
import { PlotlyChart } from "./charts/basicCharts/Plotly";
import { Rechart } from "./charts/basicCharts/Rechart";
import { RechartCustom } from "./charts/customLineChart/RechartCustom";
import { ApexCharts } from "./charts/basicCharts/ApexCharts";
import { D3 } from "./charts/basicCharts/D3";
import { Chartjs } from "./charts/basicCharts/Chartjs";
import { ChartjsCustom } from "./charts/customLineChart/ChartjsCustom";


function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/mui/line-chart" element={<LineChartMui />} />
          <Route path="/chartjs/line-chart" element={<Chartjs />} />
          <Route path="/chartjs/line-chart-custom" element={<ChartjsCustom />} />
          <Route path="/echarts/line-chart" element={<Echarts/>} />
          <Route path="/nivo/line-chart" element={<Nivo/>} />
          <Route path="/Plotly/line-chart" element={<PlotlyChart />} />
          <Route path="/rechart/line-chart" element={<Rechart />} />
          <Route path="/rechart/line-chart-custom" element={<RechartCustom/>} />
          <Route path="/apexcharts/line-chart" element={<ApexCharts/>} />
          <Route path="/apexcharts/line-chart-custom" element={<ApexChartsCustom/>} />
          <Route path="/d3/line-chart" element={<D3/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
