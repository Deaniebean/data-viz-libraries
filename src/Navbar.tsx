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
                <p>chart.js</p>
                <ul className="sub-dropdown">
                  <li>
                    <NavLink to="/chartjs/line-chart">Line Chart</NavLink>
                  </li>
                  <li>
                    <NavLink to="/chartjs/bar-chart">Bar Chart</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <p>Nivo</p>
                <ul className="sub-dropdown">
                  <li>
                    <NavLink to="/nivo/line-chart">Line Chart</NavLink>
                  </li>
                  <li>
                    <NavLink to="/nivo/bar-chart">Bar Chart</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <p>Plotly</p>
                <ul className="sub-dropdown">
                  <li>
                    <NavLink to="/plotly/line-chart">Line Chart</NavLink>
                  </li>
                  <li>
                    <NavLink to="/plotly/custom-line-chart">Bar Chart</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <p>Echarts</p>
                <ul className="sub-dropdown">
                  <li>
                    <NavLink to="/echarts/line-chart">Line Chart</NavLink>
                  </li>
                  <li>
                    <NavLink to="/echarts/bar-chart">Bar Chart</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <p>Rechart</p>
                <ul className="sub-dropdown">
                  <li>
                    <NavLink to="/rechart/line-chart">Line Chart</NavLink>
                  </li>
                  <li>
                    <NavLink to="/rechart/line-chart-custom">Bar Chart</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <p>ApexCharts</p>
                <ul className="sub-dropdown">
                  <li>
                    <NavLink to="/apexcharts/line-chart">Line Chart</NavLink>
                  </li>
                  <li>
                    <NavLink to="/apexcharts/line-chart-custom">
                      Bar Chart
                    </NavLink>
                  </li>
                </ul>
              </li>{" "}
              <li>
                <p>MUI</p>
                <ul className="sub-dropdown">
                  <li>
                    <NavLink to="/mui/line-chart">Line Chart</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <p>D3</p>
                <ul className="sub-dropdown">
                  <li>
                    <NavLink to="/d3/line-chart">Line Chart</NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="title">
            Use Case 1: Line Chart
            <ul className="dropdown">
              <li>
                <NavLink to="/apexcharts/line-chart-custom">Apexcharts</NavLink>
              </li>
              <li>
                <NavLink to="/apexcharts/line-chart-custom-2">Apexcharts2</NavLink>
              </li>
              <li>
                <NavLink to="/apexcharts/line-chart-custom-3">Apexcharts3</NavLink>
              </li>
              <li>
                <NavLink to="/chartjs/line-chart-custom">Chartjs</NavLink>
              </li>
              <li>
                <NavLink to="/rechart/line-chart-custom">Recharts</NavLink>
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
