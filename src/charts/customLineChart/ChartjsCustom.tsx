import Chart from "chart.js/auto";
import { useState, useEffect } from "react";
import { ChartData, ScatterDataPoint } from "chart.js";
import {
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
  ScriptableContext
} from "chart.js";
import dataJson from "../../utils/DataLineChart.json"; // Stelle sicher, dass dieser Import korrekt ist
import { Line } from "react-chartjs-2"; // Import für React-Komponente
import { ChartWrapper } from "../../common/chartWrapper"; // Falls du eine Wrapper-Komponente hast
import { formatMonths } from "../../utils/Months"; // Ensure formatMonths is an array of strings

Chart.register(LinearScale, PointElement, LineElement);

interface DataPoint {
  id: number;
  target: number;
  actual: number;
}

const calculateIntersections = (data: DataPoint[]) => {
  const targetData: ScatterDataPoint[] = [];
  const actualData: ScatterDataPoint[] = [];

  for (let i = 0; i < data.length - 1; i++) {
    const curr = data[i];
    const next = data[i + 1];

    targetData.push({ x: curr.id, y: curr.target });
    actualData.push({ x: curr.id, y: curr.actual });

    // Check if there's an intersection between current and next points
    if ((curr.actual < curr.target && next.actual > next.target) ||
        (curr.actual > curr.target && next.actual < next.target)) {

      // Estimate intersection using linear interpolation
      const xIntersect = curr.id + 
        Math.abs((curr.target - curr.actual) / ((next.actual - curr.actual) - (next.target - curr.target)));
      const yIntersect = curr.target + ((next.target - curr.target) * (xIntersect - curr.id));

      actualData.push({ x: xIntersect, y: yIntersect });
    }
  }

  // Add last point for both datasets
  targetData.push({ x: data[data.length - 1].id, y: data[data.length - 1].target });
  actualData.push({ x: data[data.length - 1].id, y: data[data.length - 1].actual });
  console.log("actualData:", actualData);
  return { targetData, actualData };
};

export const ChartjsCustom = () => {
    const [chartData, setChartData] = useState<ChartData<"line">>({ datasets: [] });
  
    useEffect(() => {
        const { targetData, actualData } = calculateIntersections(dataJson as DataPoint[]);
    
        setChartData({
          datasets: [
            {
              label: "Target",
              data: targetData,
              backgroundColor: "#000000",
              borderColor: "#000000",
              borderDash: [5, 5],
              borderWidth: 2,
              pointRadius: 0,
              datalabels: { display: false },
            },
            {
              label: "Actual",
              data: actualData,
              borderWidth: 2,
              borderColor: "rgb(20, 180, 37)", // Default green color for the line
              pointBorderWidth:0,
              pointRadius: (ctx: ScriptableContext<"line">) => {
                const raw = ctx.raw as ScatterDataPoint;
                return Number.isInteger(raw.x) ? 5 : 0;
              },
              pointBackgroundColor: (ctx: ScriptableContext<"line">) => {
                const raw = ctx.raw as ScatterDataPoint;
                const targetValue = targetData.find((d) => d.x === raw.x)?.y ?? 0;
                return raw.y >= targetValue ? "rgb(20, 180, 37)" : "rgb(255, 0, 0)";
              },
              datalabels: { display: false },
              segment: {
                borderColor: (ctx) => {
                  if (!ctx.p0 || !ctx.p1) return "rgba(75,192,192,1)";
    
                  const x0 = ctx.p0.parsed.x as number;
                  const x1 = ctx.p1.parsed.x as number;
                  const y0_actual = ctx.p0.parsed.y as number;
                  const y1_actual = ctx.p1.parsed.y as number;
    
                  const y0_target = targetData.find((d) => d.x === x0)?.y ?? 0;
                  const y1_target = targetData.find((d) => d.x === x1)?.y ?? 0;
    
                  return y0_actual >= y0_target && y1_actual >= y1_target
                    ? "rgb(20, 180, 37)" // Green if above target
                    : "rgb(255, 0, 0)"; // Red if below target
                },
              },
            },
            {
              // Invisible dataset for "Actual (Below Target)" in the legend
              label: "Actual",
              data: [], // No data points
              borderColor: "rgb(255, 0, 0)", // Red color for the legend
              borderWidth: 0, // Invisible line
              pointRadius: 0, // No points
              hoverRadius: 0, // No hover interaction
              datalabels: { display: false },
            },
          ],
        });
      }, []);
    
      const allMonths: string[] = formatMonths(dataJson.map((data) => data.month));
    
      return (
        <ChartWrapper title="Chart.js">
          <Line
            data={chartData}
            options={{
              scales: {
                x: {
                  type: "linear",
                  position: "bottom",
                  ticks: {
                    callback: (value) =>
                      allMonths[(value as number) - 1] || value.toString(),
                    stepSize: 1,
                  },
                  grid: { drawOnChartArea: false },
                  title: {
                    display: true,
                    text: "Months",
                  },
                },
                y: {
                  ticks: { stepSize: 1 },
                  min: 0,
                  title: {
                    display: true,
                    text: "Number of tickets [-]",
                  },
                },
              },
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    generateLabels: (chart) => {
                      const datasets = chart.data.datasets;
                      return datasets.map((dataset, i) => ({
                        text: dataset.label || `Dataset ${i + 1}`,
                        fillStyle: dataset.borderColor as string, // Use the dataset's border color
                        strokeStyle: dataset.borderColor as string,
                        hidden: !chart.isDatasetVisible(i),
                        datasetIndex: i,
                      }));
                    },
                  },
                },
              },
            } as ChartOptions<"line">}
          />
        </ChartWrapper>
      );
    };