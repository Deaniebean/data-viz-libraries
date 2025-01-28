import ReactECharts from "echarts-for-react";
import { Data } from "../../utils/Data";
import { useState } from "react";
import { ChartWrapper } from "../../common/chartWrapper";

export const EchartsLineChart = () => {
  const [chartData] = useState(Data);

  const threshold = 50; // Define your threshold value here

  const getLineColor = (value: number) => {
    return value >= threshold ? "#14b425" : "#ff0000"; // Green if above threshold, red if below
  };

  const options = {
    grid: { top: 20, right: 20, bottom: 20, left: 30 },
    xAxis: {
      type: "category",
      data: chartData.map((data) => data.month),
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      axisLine: { show: true },
    },
    series: [
      {
        type: "custom",
        renderItem: function (params, api) {
          const start = api.coord([api.value(0), api.value(1)]);
          const end = api.coord([api.value(2), api.value(3)]);

          return {
            type: "line",
            shape: {
              x1: start[0],
              y1: start[1],
              x2: end[0],
              y2: end[1],
            },
            style: {
              lineWidth: 2,
              stroke: getLineColor(api.value(1)),
            },
          };
        },
        dimensions: ["x1", "y1", "x2", "y2"],
        encode: {
          x: [0, 2],
          y: [1, 3],
        },
        data: chartData
          .map((data, index) => {
            const nextData = chartData[index + 1];
            if (!nextData) return null;
            return [data.month, data.actual, nextData.month, nextData.actual];
          })
          .filter(Boolean),
      },
      {
        data: chartData.map((data) => data.target),
        type: "line",
        smooth: true,
        lineStyle: {
          type: "dashed",
          color: "#000000", // Solid black line for the target series
        },
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  return (
    <ChartWrapper title="Echarts Line Chart">
      <ReactECharts option={options} />
    </ChartWrapper>
  );
};
