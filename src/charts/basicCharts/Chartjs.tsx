import { Line } from "react-chartjs-2";
import { Data } from "../../utils/DataLineChart";
import { useState } from "react";

// Import only required modules
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { ChartWrapper } from "../../common/chartWrapper";

// Register only the used components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
