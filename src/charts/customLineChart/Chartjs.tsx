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
  ScriptableContext
} from "chart.js";
import { useState, useRef, useEffect } from "react";
import { ChartWrapper } from "../../common/chartWrapper";
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

  const createGradient = (
    ctx: CanvasRenderingContext2D,
    chartArea: { top: number; bottom: number },
    yThreshold: number
  ) => {
    const { top, bottom } = chartArea;
    const gradient = ctx.createLinearGradient(0, top, 0, bottom);

    const offset = (1 / bottom) * yThreshold;

    gradient.addColorStop(0, "rgb(20, 180, 37)"); // Green
    gradient.addColorStop(offset, "rgb(20, 180, 37)");
    gradient.addColorStop(offset, "rgb(255, 0, 0)"); // Red
    gradient.addColorStop(1, "rgb(255, 0, 0)");

    return gradient;
  };

  const data = {
    labels: chartData.map((data) => data.month),
    datasets: [
      {
        label: "Target",
        data: chartData.map((data) => data.target),
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "Actual",
        data: chartData.map((data) => data.actual),
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: chartData.map((data) =>
          data.actual >= data.target ? "rgb(20, 180, 37)" : "rgb(255, 0, 0)"
        ),
        borderColor: (ctx: ScriptableContext<"line">) => {
          if (!ctx.chart || !ctx.chart.chartArea) return "black"; // Fallback color

          const { chartArea, scales } = ctx.chart;
          const yThreshold = scales["y"].getPixelForValue(chartData[0].target);

          return createGradient(ctx.chart.ctx, chartArea, yThreshold);
        },
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
    <ChartWrapper title="Chart.js Gradient Color Switch">
      <Line ref={chartRef} data={data} options={options} />
    </ChartWrapper>
  );
};
