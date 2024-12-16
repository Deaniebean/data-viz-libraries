import { NavLink } from "react-router-dom";
import "./styles/App.scss";
import { ThemeToggle } from "./themeToggle";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navigation">
        <ul>
          <li>
            <NavLink to="/">MUI</NavLink>
            <ul className="dropdown">
              <li>
                <NavLink to="/mui/line-chart">Line Chart</NavLink>
              </li>
              <li>
                <NavLink to="/mui/custom-line-chart">Custom Line Chart</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/chartjs">chart.js</NavLink>
            <ul className="dropdown">
              <li>
                <NavLink to="/chartjs/line-chart">Line Chart</NavLink>
              </li>
              <li>
                <NavLink to="/chartjs/custom-line-chart">Custom Line Chart</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/d3">D3</NavLink>
            <ul className="dropdown">
              <li>
                <NavLink to="/mui/line-chart">Line Chart</NavLink>
              </li>
              <li>
                <NavLink to="/mui/custom-line-chart">Custom Line Chart</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/plotly">Plotly</NavLink>
            <ul className="dropdown">
              <li>
                <NavLink to="/plotly/line-chart">Line Chart</NavLink>
              </li>
              <li>
                <NavLink to="/plotly/custom-line-chart">Custom Line Chart</NavLink>
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
