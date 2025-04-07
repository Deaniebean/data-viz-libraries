import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";

import { LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([LineChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent, CanvasRenderer]);

import { useState, useEffect } from "react";
import { ChartWrapper } from "../../common/chartWrapper";
import dataJson from "../../utils/DataLineChart.json"; 
import { formatMonths } from "../../utils/Months";

const calculateIntersections = (data: { id: number; actual: number; target: number }[]): { actualData: [number, number][]; targetData: [number, number][] } => {
  const actualData: [number, number][] = data.map((d) => [d.id, d.actual]);
  const targetData: [number, number][] = data.map((d) => [d.id, d.target]);

  for (let i = 0; i < data.length - 1; i++) {
    const curr = data[i];
    const next = data[i + 1];

    if ((curr.actual < curr.target && next.actual > next.target) ||
        (curr.actual > curr.target && next.actual < next.target)) {

      // linear interpolation
      const xIntersect = curr.id + 
        Math.abs((curr.target - curr.actual) / ((next.actual - curr.actual) - (next.target - curr.target)));
      const yIntersect = curr.target + ((next.target - curr.target) * (xIntersect - curr.id));

      actualData.push([xIntersect as number, yIntersect as number]);
    }
  }

  // Sort data after adding intersections
  actualData.sort((a, b) => a[0] - b[0]);

  return { actualData, targetData };
};

export const EchartsLineChart = () => {
  const [processedData, setProcessedData] = useState<{ actualData: [number, number][]; targetData: [number, number][] }>({ actualData: [], targetData: [] });

  useEffect(() => {
    console.log("dataJson", dataJson); // Debugging: Log dataJson to check for unexpected changes

    setProcessedData((prev) => {
      const newResult = calculateIntersections(dataJson);

      // Prevent unnecessary updates (only update if data has changed)
      if (JSON.stringify(prev) === JSON.stringify(newResult)) return prev;
      return newResult;
    });
  }, []); 

  // Generate dynamic gradient stops based on actual vs target values
  const colorStops: { offset: number; color: string }[] = [];

  for (let i = 0; i < processedData.actualData.length - 1; i++) {
    const currPoint = processedData.actualData[i];
    const nextPoint = processedData.actualData[i + 1];

    if (!currPoint || !nextPoint) continue;

    const xMin = processedData.actualData[0][0];
    const xMax = processedData.actualData[processedData.actualData.length - 1][0];

    const offset = (currPoint[0] - xMin) / (xMax - xMin);
    const nextOffset = (nextPoint[0] - xMin) / (xMax - xMin);

    // Interpolating target value for each segment
    const targetY1 = processedData.targetData.find((t) => t[0] === currPoint[0])?.[1] ?? 0;
    const targetY2 = processedData.targetData.find((t) => t[0] === nextPoint[0])?.[1] ?? 0;

    const color = (currPoint[1] >= targetY1 && nextPoint[1] >= targetY2) ? "#14b425" : "#ff0000"; // Green if above, Red if below

    colorStops.push({ offset, color });
    colorStops.push({ offset: nextOffset, color });
  }

  const options = {
    xAxis: {
      type: "value",
      min: 1,
      max: 12,
      interval: 1,
      axisLabel: {
        formatter: (value: number) => {
          const allMonths: string[] = formatMonths(dataJson.map((data) => data.month));
          return allMonths[Math.round(value) - 1] || value.toString();
        },
        show: true, 
        margin: 10, 
      },
      name: "Months", 
      nameLocation: "middle",
      nameGap: 30, 
      splitLine: { show: false },
    },
    yAxis: {
      type: "value",
      name: "Number of Tickets [-]", 
      nameLocation: "middle",
      nameGap: 50, 
      axisLine: { show: true },
      axisLabel: {
        show: true, 
        margin: 10,  
      },
    },
    legend: { 
      orient: "horizontal", 
      left: "center", 
      bottom: 0,
      data: [
        { name: "Actual", icon: "circle", itemStyle: { color: "#14b425" } },
        { name: "Actual ", icon: "circle", itemStyle: { color: "#ff0000" } },
        { name: "Target", icon: "circle", itemStyle: { color: "black" } }
      ] 
    },
    series: [
      {
        name: "Actual",
        data: processedData.actualData,
        type: "line",
        lineStyle: {
          width: 3,
          color: {
            type: "linear",
            x: 0, y: 0, x2: 1, y2: 0,
            colorStops: colorStops,
            global: false,
          },
        },
        symbol: "circle",
        symbolSize: (value: [number, number]) => {
          return Number.isInteger(value[0]) ? 8 : 0; // Show marker only for whole x values
        },
        itemStyle: {
          color: (params: { dataIndex: number }) => {
            const point = processedData.actualData[params.dataIndex];
            if (!point) return "#000000"; 
            const y_actual = point[1];
            const y_target = processedData.targetData.find((t) => t[0] === point[0])?.[1] ?? 0;
            return y_actual >= y_target ? "#14b425" : "#ff0000"; 
          },
        },
      },
      {
        name: "Target",
        data: processedData.targetData,
        type: "line",
        lineStyle: { width: 3, color: "black", type: "dashed" },
        itemStyle: { color: "black" },
      },
      {
        name: "Actual ", 
        data: [],
        type: "line",
        lineStyle: { width: 0 }, 
        symbol: "none",
        itemStyle: { color: "#ff0000" }, 
        emphasis: { disabled: true }, 
      },
    ], width: "80%", 
    tooltip: { trigger: "axis" },
  };

  return (
    <ChartWrapper title="ECharts">
      {({ width, height }) => (
        <ReactEChartsCore
          echarts={echarts}
          option={options}
          style={{ width, height }}
        />
      )}
    </ChartWrapper>
  );
};
