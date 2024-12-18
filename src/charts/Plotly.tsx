import React, { useEffect, useRef } from "react";
import Plotly from "plotly.js-dist-min"; // Use plotly.js-dist-min for better compatibility with Vite
import { Data } from "../utils/Data";

export const PlotlyChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartData = Data;

  useEffect(() => {
    if (chartRef.current) {
      Plotly.newPlot(
        chartRef.current,
        [
          {
            x: chartData.map((data) => data.month),
            y: chartData.map((data) => data.actual),
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
          },
          {
            x: chartData.map((data) => data.month),
            y: chartData.map((data) => data.target),
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "green" },
          },
        ],
        { title: "KPI tracker" }
      );
    }
  }, [chartData]);

  return (
    <div className="plotly-chart">
      <h1>Plotly</h1>
      <div ref={chartRef} style={{ width: "800px", height: "600px" }}></div>
    </div>
  );
};
