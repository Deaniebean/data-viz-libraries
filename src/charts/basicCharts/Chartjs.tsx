import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Data } from "../../utils/DataLineChart";
import { useState } from "react";
import { CategoryScale } from "chart.js";
import { ChartWrapper } from "../../common/chartWrapper";

Chart.register(CategoryScale);

export const Chartjs = () => {
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
    <ChartWrapper title="Chartjs">
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
    </ChartWrapper>
  );
};
