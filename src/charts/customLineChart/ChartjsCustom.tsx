import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { ChartWrapper } from "../../common/chartWrapper";
import { useEffect, useRef, useState } from "react";
import { Data } from "../../utils/DataLineChart";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const ChartjsCustom = () => {

  const [chartData] = useState(Data);
   const chartRef = useRef<ChartJS<"line"> | null>(null);
  
    useEffect(() => {
      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
          chartRef.current = null;
        }
      };
    }, []);

  const data = {
    labels: chartData.map((data) => data.month),
    datasets: [
      {
        label: "Value",
        data: chartData.map((data) => data.actual),
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: chartData.map((data) =>
            data.actual >= data.target ? "rgb(20, 180, 37)" : "rgb(255, 0, 0)"
          ),
        segment: {
          borderColor: (ctx) => {
            const index = ctx.p1DataIndex;
            return chartData[index].actual >= chartData[index].target
              ? "rgb(20, 180, 37)" 
              : "rgb(255, 0, 0)"; 
          },
        },
      },
      {
        label: "Threshold",
        data: chartData.map((data) => data.target),
        borderWidth: 2,
        borderColor: "rgba(0, 0, 0, 0.7)", 
        borderDash: [5, 5], 
        pointRadius: 0, 
        stepped:true,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",        
      },
    },
    scales: {
      y: {
        title:{
        display: true,
        text: "Number of tickets [-]",
      },
      min: 0,
    },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <ChartWrapper title="Chart.js">
      <Line data={data} options={options} />
    </ChartWrapper>
  );
};
