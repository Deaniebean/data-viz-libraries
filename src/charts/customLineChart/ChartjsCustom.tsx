import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Data } from "../../utils/Data";
import { useState } from "react";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

export const ChartjsCustom = () => {
  const [chartData] = useState({
    labels: Data.map((data) => data.month),
    datasets: [
      {
        label: "Target",
        data: Data.map((data) => data.target),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
      {
        label: "Actual",
        data: Data.map((data) => data.actual),
        backgroundColor: "rgba(255,99,132,0.4)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
    ],
  });

  return (
    <div
      className="chart-container"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ alignItems: "center" }}>chart.js</h1>
      <div style={{ width: "800px", height: "600px" }}>
        <Line
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "KPI's 2024",
              },
            },
          }}
        />
      </div>
    </div>
  );
};
