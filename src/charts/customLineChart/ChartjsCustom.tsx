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
  ScriptableLineSegmentContext,
} from "chart.js";
import { ChartWrapper } from "../../common/chartWrapper";
import { useEffect, useRef, useState } from "react";
import { Data } from "../../utils/DataLineChart";
import { formatMonths } from "../../utils/Months";

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

  const allMonths: string[] = formatMonths(chartData.map((data) => data.month));
  console.log("All months:", allMonths);

  const data = {
    labels: allMonths,
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
          borderColor: (ctx: ScriptableLineSegmentContext) => {
            const index = ctx.p1DataIndex;
            return chartData[index].actual >= chartData[index].target
              ? "rgb(20, 180, 37)"
              : "rgb(255, 0, 0)";
          },
        },
        datalabels: {
          display: false, 
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
        datalabels: {
          display: false, 
        },
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
          drawOnChartArea: false,
          },
        ticks: {
          display: true,
        
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
