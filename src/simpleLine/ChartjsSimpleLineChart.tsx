import { Line } from "react-chartjs-2";
import { useState } from "react";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const ChartjsSimple = () => {
  const [chartData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Target",
        data: [3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
      {
        label: "Actual",
        data: [2, 3, 4, 2, 5, 4, 5, 5, 6, 5, 4, 3],
        backgroundColor: "rgba(255,99,132,0.4)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
    ],
  });

  return (
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

  );
};