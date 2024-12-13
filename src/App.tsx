import { Route, Routes } from "react-router-dom";
import "./styles/App.scss";
import { Mui } from "./Mui";
import { Chartjs } from "./Chartjs";
import { Navbar } from "./Navbar";
import { D3 } from "./D3";
import { Plotly } from "./Plotly";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Mui />} />
          <Route path="/chartjs" element={<Chartjs />} />
          <Route path="/D3" element={<D3 />} />
          <Route path="/Plotly" element={<Plotly />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
