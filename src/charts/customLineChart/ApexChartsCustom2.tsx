import Chart from "react-apexcharts";
import { useState, useEffect } from "react";
import { ChartWrapper } from "../../common/chartWrapper";
import dataJson from "../../utils/DataLineChart.json"; // Ensure this import is correct

interface DataPoint {
  id: number;
  target: number;
  actual: number;
}

const calculateIntersections = (data: DataPoint[]) => {
  const targetData = data.map(d => ({ x: d.id, y: d.target }));
  const actualData = data.map(d => ({ x: d.id, y: d.actual }));

  for (let i = 0; i < data.length - 1; i++) {
    const curr = data[i];
    const next = data[i + 1];

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

  // Sort actualData by x value to maintain correct order
  actualData.sort((a, b) => a.x - b.x);

  return { targetData, actualData };
};

export const ApexChartsCustom2 = () => {
  const [chartData, setChartData] = useState<{ targetData: { x: number; y: number }[]; actualData: { x: number; y: number }[] }>({ targetData: [], actualData: [] });

  useEffect(() => {
    const { targetData, actualData } = calculateIntersections(dataJson as DataPoint[]);
    setChartData({ targetData, actualData });
  }, []);

  const coloredData = chartData.actualData.map((point) => {
    // Find the target values surrounding the current point
    const targetCurr = chartData.targetData.find((t) => t.x === point.x);
    let targetNext = chartData.targetData.find((t) => t.x > point.x);
    if (!targetNext) targetNext = chartData.targetData[chartData.targetData.length - 1];

    // Interpolate target value if necessary (in case the x is not an exact match)
    const interpolatedTargetY = targetCurr
      ? targetCurr.y + (targetNext.y - targetCurr.y) * (point.x - targetCurr.x) / (targetNext.x - targetCurr.x)
      : targetNext.y; // Fallback to targetNext.y if targetCurr is undefined

    // Determine the color based on whether the actual value is above or below the target
    const color = point.y >= interpolatedTargetY ? "#14b425" : "#ff0000"; // Green if above target, red if below

    return {
      x: point.x,
      y: point.y,
      color: color, // This decides the color
    };
  });

  const colorStops = coloredData.map((dataPoint, index) => {
    const nextDataPoint = coloredData[index + 1];
    if (!nextDataPoint) return null;

    // Get the range of x values in the data
    const firstPointX = coloredData[0].x;
    const lastPointX = coloredData[coloredData.length - 1].x;

    // Calculate offset based on the current x and last x values
    const offset = ((dataPoint.x - firstPointX) / (lastPointX - firstPointX)) * 100.0;
    const nextOffset = ((nextDataPoint.x - firstPointX) / (lastPointX - firstPointX)) * 100.0;

    // Determine the segment color based on the comparison with target data
    const y0_actual = dataPoint.y;
    const y1_actual = nextDataPoint.y;
    const y0_target = chartData.targetData.find((d) => d.x === dataPoint.x)?.y ?? 0;
    const y1_target = chartData.targetData.find((d) => d.x === nextDataPoint.x)?.y ?? 0;

    const sectionColor = y0_actual >= y0_target && y1_actual >= y1_target
      ? "#14b425" // Green if both points are above or on the target
      : "#ff0000"; // Red if any point is below the target

    return {
      offset: offset,
      nextOffset: nextOffset,
      color: sectionColor,
      nextColor: sectionColor,
    };
  }).filter(stop => stop !== null);

  const chartOptions = {
    series: [
      {
        name: "Actual",
        data: coloredData.map((data) => ({
          x: data.x,
          y: data.y,
          fillColor: data.color
        })),
      },
      {
        name: "Target",
        data: chartData.targetData,
        type: "line",
      },
    ],
    chart: { height: 350 },
    xaxis: {
      type: "numeric" as const,
      title: { text: "Months" },
      max: 12, // Ensure it ends at 12
      tickAmount: 12, // Adjust tick amount accordingly
      labels: {
        formatter: (value: string) => Math.round(Number(value)).toString(), // Ensure whole numbers
      },
    },
    yaxis: {
      title: { text: "Values" },
      min: 0, // Ensure y-axis starts at 0
      labels: {
        formatter: (value: number) => Math.round(value).toString(), // Show only whole numbers
      },
    },
    fill: {
      type: ["gradient", "solid"],
      colors: ["#000000"],
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        colorStops: colorStops.flatMap((stop) => [
          { offset: stop.offset, color: stop.color, opacity: 1 },
          { offset: stop.nextOffset, color: stop.nextColor, opacity: 1 },
        ]),
      },
    },
    stroke: {
      curve: ["straight" as const, "straight" as const],
      dashArray: [0, 5],
    },
    markers: { size: 5 },
    tooltip: {
      x: { format: "MMM" },
    },
  };

  return (
    <ChartWrapper title="ApexCharts">
      <Chart
        type="line"
        options={chartOptions}
        series={chartOptions.series}
        width="100%"
      />
    </ChartWrapper>
  );
};
