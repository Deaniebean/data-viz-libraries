import ReactECharts from "echarts-for-react";
import { Data } from "../../utils/DataLineChart";
import { useState } from "react";
import { ChartWrapper } from "../../common/chartWrapper";
import { formatMonths } from "../../utils/Months";

export const EchartsLineChart = () => {
  const [chartData] = useState(Data);
  const allMonths: string[] = formatMonths(chartData.map((data) => data.month));
  
  // Generate dynamic gradient stops based on actual vs target
  const colorStops = chartData
    .map((data, index) => {
      const nextData = chartData[index + 1];
      if (!nextData) return null;

      const isAboveTarget = data.actual >= data.target;
      const nextIsAboveTarget = nextData.actual >= nextData.target;

      return {
        offset: index / (chartData.length - 1),
        color: isAboveTarget ? "#14b425" : "#ff0000",
        nextColor: nextIsAboveTarget ? "#14b425" : "#ff0000",
      };
    })
    .filter(Boolean);

  const options = {
    grid: { top: 20, right: 20, bottom: 20, left: 30 },
    xAxis: {
      type: "category",
      data: allMonths,
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      title: {
        text: "Number of tickets [-]",
      },
      axisLine: { show: true },
    },
    legend: {
      orient: "horizontal",
      left: "center",
      top: "top",
    },
    series: [
      {
        name: "Actual",
        data: chartData.map((data) => data.actual),
        type: "line",
        lineStyle: {
          width: 3,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: colorStops.flatMap((stop) => [
              { offset: stop?.offset, color: stop?.color },
              { offset: stop?.offset, color: stop?.nextColor },
            ]),
            global: false,
          },
        },
        itemStyle: {
          color: (params) => {
            const index = params.dataIndex;
            return chartData[index].actual >= chartData[index].target
              ? "#14b425" 
              : "#ff0000"; 
          },
        },
        symbol: "circle", 
        symbolSize: 8, 
      },
      {
        name: "Target",
        data: chartData.map((data) => data.target),
        type: "line",
        step: "end",
        lineStyle: {
          width: 3,
          color: "black",
          type: "dashed",
        },
        itemStyle: {
          color: "black",
        },
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  return (
    <ChartWrapper title="Echarts">
      <ReactECharts option={options} />
    </ChartWrapper>
  );
};
