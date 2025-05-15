import { NavLink } from "react-router-dom";
import "./styles/App.scss";
import { ThemeToggle } from "./themeToggle";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navigation">
        <ul>
          <li className="title">
            Simple Charts
            <ul className="dropdown">
              <li>
                <p><NavLink to="/chartjs/line-chart">Chart.js</NavLink></p>
              </li>
              <li>
                <p> <NavLink to="/nivo/line-chart">Nivo</NavLink></p>
              </li>
              <li>
                <p><NavLink to="/plotly/line-chart">Plotly</NavLink></p>
              </li>
              <li>
                <p><NavLink to="/matplotlib/line-chart">matplotlib + pyodide</NavLink></p>
              </li>
              <li>
                <p><NavLink to="/echarts/line-chart">ECharts</NavLink></p>
              </li>
              <li>
                <p> <NavLink to="/rechart/line-chart">Rechart</NavLink></p>
              </li>
              <li>
                <p>  <NavLink to="/apexcharts/line-chart">ApexCharts</NavLink></p>
              </li>{" "}
              <li>
                <p><NavLink to="/mui/line-chart">MUI</NavLink></p>
              </li>
              <li>
                <p><NavLink to="/d3/line-chart">D3</NavLink></p>
              </li>
            </ul>
          </li>
          <li className="title">
          Use Case 1: Line Chart
          <ul className="dropdown">
            <li>
              <p>ApexCharts</p>
              <ul className="sub-dropdown">
                <li>
                  <NavLink to="/apexcharts/apex-line-simple">Apexcharts Simple</NavLink>
                </li>
                <li>
                  <NavLink to="/apexcharts/line-chart-custom-2">Apexcharts Custom</NavLink>
                </li>
              </ul>
            </li>
            <li>
              <p>chart.js</p>
              <ul className="sub-dropdown">
                <li>
                  <NavLink to="/chartjs/chartjs-line-simple">Chart.js Simple</NavLink>
                </li>
                <li>
                  <NavLink to="/chartjs/line-chart-custom">Chart.js Custom</NavLink>
                </li>
              </ul>
            </li>

            <li>
              <p>Echarts</p>
              <ul className="sub-dropdown">
                <li>
                  <NavLink to="/echarts/echarts-line-simple">Chart.js Simple</NavLink>
                </li>
                <li>
                  <NavLink to="/echarts/line-chart-custom">Echarts Custom</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </li>
          <li className="title">
            Use Case 2: Pareto Chart
            <ul className="dropdown">
              <li>
                <NavLink to="/apexcharts/pareto">Apexcharts</NavLink>
              </li>
              <li>
                <NavLink to="/chartjs/pareto">Chart.js</NavLink>
              </li>
              <li>
                <NavLink to="/echarts/pareto">Echarts</NavLink>
              </li>
            </ul>
          </li>
          <li className="title">
            Use Case 3: Sankey Chart
            <ul className="dropdown">
              <li>
                <NavLink to="/chartjs/sankey">Chart.js</NavLink>
              </li>
              <li>
                <NavLink to="/apexcharts/sankey">ApexCharts</NavLink>
              </li>
              <li>
                <NavLink to="/echarts/sankey">Echarts</NavLink>
              </li>
              <li>
                <NavLink to="/echarts/sankey2">Echarts 2</NavLink>
              </li>     
            </ul>
          </li>
        </ul>
      </div>
      <div className="theme">
        <ThemeToggle />
      </div>
    </div>
  );
};
