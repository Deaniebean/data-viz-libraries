import { Route, Routes } from "react-router-dom";
import "./styles/App.scss";
import { Navbar } from "./Navbar";
import { ApexChartsCustom } from "./charts/customLineChart/ApexChartsCustom";
import { LineChartMui } from "./charts/basicCharts/LineChartMui";
import { Echarts } from "./charts/basicCharts/Echarts";
import { Nivo } from "./charts/basicCharts/Nivo";
import { PlotlyChart } from "./charts/basicCharts/Plotly";
import { Rechart } from "./charts/basicCharts/Rechart";
import { ApexCharts } from "./charts/basicCharts/ApexCharts";
import { D3 } from "./charts/basicCharts/D3";
import { Chartjs } from "./charts/basicCharts/Chartjs";
import { RechartCustom } from "./charts/customLineChart/RechartCustom";
import { ChartjsCustom } from "./charts/customLineChart/Chartjs";
import { ApexChartsCustom2 } from "./charts/customLineChart/ApexChartsCustom2";
import { EchartsLineChart } from "./charts/customLineChart/EchartsLineChart";
import { ApexPareto } from "./charts/paretoChart/ApexPareto";
import { ChartjsPareto } from "./charts/paretoChart/ChartjsPareto";
import { EchartsPareto } from "./charts/paretoChart/EchartsPareto";
import { ChartjsSankey } from "./charts/sankeyChart/ChartjsSankey";
import { EchartsSankey } from "./charts/sankeyChart/EchartsSankey";
import { ApexSankeyChart } from "./charts/sankeyChart/ApexSankey";
import { EchartsSankey2 } from "./charts/sankeyChart/sankeyforPareto/EchartsSankey2";
import { EchartsSankey3 } from "./charts/sankeyChart/EchartsSankey3";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/mui/line-chart" element={<LineChartMui />} />
          <Route path="/chartjs/line-chart" element={<Chartjs />} />
          <Route
            path="/chartjs/line-chart-custom"
            element={<ChartjsCustom />}
          />
          <Route path="/echarts/line-chart" element={<Echarts />} />
          <Route path="/nivo/line-chart" element={<Nivo />} />
          <Route path="/Plotly/line-chart" element={<PlotlyChart />} />
          <Route path="/rechart/line-chart" element={<Rechart />} />
          <Route path="/d3/line-chart" element={<D3 />} />
          <Route
            path="/rechart/line-chart-custom"
            element={<RechartCustom />}
          />
          <Route path="/apexcharts/line-chart" element={<ApexCharts />} />
          <Route
            path="/apexcharts/line-chart-custom"
            element={<ApexChartsCustom />}
          />
          <Route
            path="/apexcharts/line-chart-custom-2"
            element={<ApexChartsCustom2 />}
          />
          <Route
            path="/echarts/line-chart-custom"
            element={<EchartsLineChart />}
          />
            <Route path="/apexcharts/pareto" element={<ApexPareto />} />
            <Route path="/chartjs/pareto" element={<ChartjsPareto />} />
            <Route path="/echarts/pareto" element={<EchartsPareto />} />



          <Route path="/chartjs/sankey" element={<ChartjsSankey />} />
          <Route path="/apexcharts/sankey" element={<ApexSankeyChart />} />
          <Route path="/echarts/sankey" element={<EchartsSankey />} />
          <Route path="/echarts/sankey2" element={<EchartsSankey2 />} />
          <Route path="/echarts/sankey3" element={<EchartsSankey3 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
