import { Line } from "react-chartjs-2";
import { ChartWrapper } from "../../common/chartWrapper";
import { useState } from "react";
import { Data } from "../../utils/Data";

export const ChartjsCustom = () => {
  const [chartData] = useState(Data);

  const data = {
    labels: chartData.map((data) => data.month),
    datasets: [
      {
        label: "Target",
        data: chartData.map((data) => data.target),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(0,0,0,1)", 
        borderWidth: 1,
        borderDash: [5, 5], 
      },
      {
        label: "Actual",
        data: chartData.map((data) => data.actual),
        backgroundColor: "rgba(255,99,132,0.4)",
        borderColor: "rgba(255,99,132,1)",
        segment: {
          borderColor: (ctx) => {
            const index = ctx.p0DataIndex; // Get the current index
            const nextIndex = ctx.p1DataIndex; // Get the next index
            const currentActual = chartData[index].actual;
            const nextActual = chartData[nextIndex].actual;
            const currentTarget = chartData[index].target;
            const nextTarget = chartData[nextIndex].target;

            // Determine the color based on the comparison between actual and target values
            const currentColor = currentActual >= currentTarget ? "rgb(20, 180, 37)" : "rgb(255, 0, 0)";
            const nextColor = nextActual >= nextTarget ? "rgb(20, 180, 37)" : "rgb(255, 0, 0)";

            // Return the color for the segment
            return currentColor === nextColor ? currentColor : nextColor;
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

  return (
    <ChartWrapper title="Chartjs">
      <Line data={data} options={options} />
    </ChartWrapper>
  );
};