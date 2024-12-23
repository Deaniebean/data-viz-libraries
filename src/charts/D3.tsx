import { useEffect, useRef, useState } from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { Data } from "../utils/Data";

export const D3 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartData] = useState(Data);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing plots
    containerRef.current.innerHTML = "";

    const plot = Plot.plot({
      y: { grid: true },
      color: { scheme: "burd" },
      marks: [
        Plot.ruleY([0]),
        Plot.dot(chartData, { x: "month", y: "actual", stroke: "actual" }),
        Plot.dot(chartData, { x: "month", y: "target", stroke: "target" }),
      ],
    });

    containerRef.current.appendChild(plot);

    // Cleanup function to remove the plot when the component unmounts
    return () => plot.remove();
  }, [chartData]);

  return (
    <div className="d3-chart">
      <h1>D3 Chart</h1>
      <div ref={containerRef} style={{ width: "800px", height: "600px" }}></div>
    </div>
  );
};
