import { CategoryScale, Chart } from "chart.js";
import { useState } from "react";
import { Data } from "../../utils/Data";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale);

export const ChartjsCustom = () => {
  const [chartData] = useState(Data);

  const data = {
    labels: chartData.map((data) => data.month),
    datasets: [
      {
        label: "Target",
        data: chartData.map((data) => data.target),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
      {
        label: "Actual",
        data: chartData.map((data) => data.actual),
        backgroundColor: "rgba(255,99,132,0.4)",
        borderColor: "rgba(255,99,132,1)",
        segment: {
          borderColor: (ctx: { p0DataIndex: any; }) => {
            const index = ctx.p0DataIndex; // Get the current index
            return chartData[index].target > chartData[index].actual
              ? "rgb(192,75,75)" // Red color if target > actual
              : "rgb(79, 161, 12)"; // Default color
          },
        },
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return <Line data={data} options={options} />;
};
