import { Route, Routes } from "react-router-dom";
import "./styles/App.scss";
import { Navbar } from "./Navbar";
import { LineChartMui } from "./charts/basicCharts/LineChartMui";
import { Echarts } from "./charts/basicCharts/Echarts";
import { Nivo } from "./charts/basicCharts/Nivo";
import { PlotlyChart } from "./charts/basicCharts/Plotly";
import { Rechart } from "./charts/basicCharts/Rechart";
import { ApexCharts } from "./charts/basicCharts/ApexCharts";
import { D3 } from "./charts/basicCharts/D3";
import { Chartjs } from "./charts/basicCharts/Chartjs";
import { ApexChartsCustom2 } from "./charts/customCharts/customLineChart/ApexChartsCustom2";
import { ApexPareto } from "./charts/customCharts/paretoChart/ApexPareto";
import { ChartjsPareto } from "./charts/customCharts/paretoChart/ChartjsPareto";
import { EchartsPareto } from "./charts/customCharts/paretoChart/EchartsPareto";
import { ChartjsSankey } from "./charts/customCharts/sankeyChart/ChartjsSankey";
import { EchartsSankey } from "./charts/customCharts/sankeyChart/EchartsSankey";
import { ApexSankeyChart } from "./charts/customCharts/sankeyChart/ApexSankey";
import { EchartsSankey2 } from "./charts/customCharts/sankeyChart/sankeyforPareto/EchartsSankey2";
import PyodideChart from "./charts/basicCharts/PyodideChart";
import { ApexChartsCustom } from "./charts/experimental/ApexChartsCustom";
import { ChartjsCustom } from "./charts/customCharts/customLineChart/ChartjsCustom";
import { EchartsLineChart } from "./charts/customCharts/customLineChart/EchartsLineChart";
import { ChartjsSimple } from "./charts/simpleCharts/simpleLine/ChartjsSimpleLineChart";
import { ApexSimple } from "./charts/simpleCharts/simpleLine/ApexSimpleLine";
import { EChartsSimple } from "./charts/simpleCharts/simpleLine/EchartsSimpleLineChart";
import { ChartjsParetoSimple } from "./charts/simpleCharts/simplePareto/ChartjsParetoSimple";
import { Home } from "./home/Home";

function App() {
  return (
      <div className="app-container" >
        <Navbar />
        <div className="content">
        
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/mui/line-chart" element={<LineChartMui />} />
            <Route path="/chartjs/line-chart" element={<Chartjs />} />
            <Route path="/echarts/line-chart" element={<Echarts />} />
            <Route path="/nivo/line-chart" element={<Nivo />} />
            <Route path="/Plotly/line-chart" element={<PlotlyChart />} />
            <Route path="/rechart/line-chart" element={<Rechart />} />
            <Route path="/d3/line-chart" element={<D3 />} />
            <Route path="/apexcharts/line-chart" element={<ApexCharts />} />
            <Route path="/matplotlib/line-chart" element={<PyodideChart />} />
            
            
            <Route path="/apexcharts/line-chart-custom" element={<ApexChartsCustom />}/>          
            <Route path="/chartjs/line-chart-custom" element={<ChartjsCustom />}/>
            <Route path="/apexcharts/line-chart-custom-2" element={<ApexChartsCustom2 />}/>
            <Route path="/echarts/line-chart-custom" element={<EchartsLineChart />}/>


            <Route path="/apexcharts/pareto" element={<ApexPareto />} />
            <Route path="/chartjs/pareto" element={<ChartjsPareto />} />
            <Route path="/echarts/pareto" element={<EchartsPareto />} />

            <Route path="/chartjs/pareto/simple" element={<ChartjsParetoSimple />} />

            <Route path="/chartjs/sankey" element={<ChartjsSankey />} />
            <Route path="/apexcharts/sankey" element={<ApexSankeyChart />} />
            <Route path="/echarts/sankey" element={<EchartsSankey />} />
            <Route path="/echarts/sankey2" element={<EchartsSankey2 />} />
          
            <Route path="/chartjs/chartjs-line-simple" element={<ChartjsSimple />} />
            <Route path="/echarts/echarts-line-simple" element={<EChartsSimple />} />
            <Route path="/apexcharts/apex-line-simple" element={<ApexSimple/>} />
          </Routes>
      
          
        </div>
      </div> 
 

  );
}

export default App;
