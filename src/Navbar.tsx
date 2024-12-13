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
          </li>
          <li>
            <NavLink to="/chartjs">chart.js</NavLink>
          </li>
          <li>
            <NavLink to="/d3">D3</NavLink>
          </li>
          <li>
            <NavLink to="/plotly">Plotly</NavLink>
          </li>
        </ul>
      </div>
      <div className="theme">
        <ThemeToggle/>
      </div>
    </div>
  );
};
