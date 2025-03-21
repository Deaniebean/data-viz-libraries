import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useState } from "react";
import { ChartWrapper } from "../../common/chartWrapper";
import { LinearScale, PointElement, LineElement, ScriptableLineSegmentContext } from "chart.js";


Chart.register(LinearScale, PointElement, LineElement);


const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


export const ChartjsTry = () => {
    const [chartData] = useState({
        datasets: [
          {
            label: "Target",
            data: [
              { x: 1, y: 3 },
              { x: 2, y: 3 },
              { x: 3, y: 3 },
              { x: 4, y: 3 },
              { x: 5, y: 4 },
              { x: 6, y: 4 },
              { x: 7, y: 4 },
              { x: 8, y: 4 },
              { x: 9, y: 4 },
              { x: 10, y: 4 },
              { x: 11, y: 4 },
              { x: 12, y: 4 },
            ],
            backgroundColor: "#000000",
            borderColor: "#000000",
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 0,
            datalabels: {
              display: false,
            },
          },
          {
            label: "Actual",
            data: [
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 4 },
              { x: 3.5, y: 3 },
              { x: 4, y: 2 },
              { x: 4.5, y: 3.5 },
              { x: 5, y: 5 },
              { x: 6, y: 4 },
              { x: 7, y: 5 },
              { x: 8, y: 5 },
              { x: 9, y: 6 },
              { x: 10, y: 5 },
              { x: 11, y: 4 },
              { x: 12, y: 3 },
            ],
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 2,
            pointRadius: (ctx) => (Number.isInteger(ctx.raw.x) ? 5 : 0), // Fixed syntax
            datalabels: {
              display: false,
            },
            segment: {
              borderColor: (ctx: ScriptableLineSegmentContext) => {
                if (!ctx.p0 || !ctx.p1) return "rgba(75,192,192,1)";
     
                const targetData = ctx.chart.data.datasets[0].data;
                const x0 = ctx.p0.parsed.x;
                const x1 = ctx.p1.parsed.x;
     
                const y0_actual = ctx.p0.parsed.y;
                const y1_actual = ctx.p1.parsed.y;
                const y0_target = targetData.find((d) => d.x === x0)?.y ?? 0;
                const y1_target = targetData.find((d) => d.x === x1)?.y ?? 0;
     
                // Segment is green if both start and end points are on/above the target
                return y0_actual >= y0_target && y1_actual >= y1_target
                  ? "rgb(20, 180, 37)"
                  : "rgb(255, 0, 0)";
              },
            },
          },
        ],
      });
     


  return (
    <ChartWrapper title="Chartjs">
      <Line
        data={chartData}
        options={{
          scales: {
            x: {
              type: "linear",
              position: "bottom",
              ticks: {
                callback: (value) => monthLabels[value - 1] || value,
                stepSize: 1,
              },
              grid: {
                drawOnChartArea: false,
                },
            },
            y: {
              ticks: {
                stepSize: 1,
              },
              min: 0,
            },
          },
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
