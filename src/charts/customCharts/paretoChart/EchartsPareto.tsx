import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
  MarkLineComponent
} from 'echarts/components'; 
import { CanvasRenderer } from 'echarts/renderers';

import { ChartWrapper } from '../../../common/chartWrapper';
import { useState } from 'react';
import { ParetoData } from '../../../utils/DataPareto';

// Register only required components
echarts.use([
  BarChart,
  LineChart,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  MarkLineComponent,
  CanvasRenderer,
]);

export const EchartsPareto = () => {
  const [chartData] = useState(ParetoData);
  const categories = Array.from(new Set(chartData.map((data) => data.group)));

  const openIssuesCount = categories.map(
    (category) =>
      chartData.filter(
        (data) => data.group === category && data.status !== 4
      ).length
  );
  openIssuesCount.sort((a, b) => b - a);

  const totalOpenIssues = openIssuesCount.reduce((acc, count) => acc + count, 0);
  let cumulativeSum = 0;
  const cumulativePercentage = openIssuesCount.map((count) => {
    cumulativeSum += count;
    return Math.floor((cumulativeSum / totalOpenIssues) * 100);
  });

  const index80 = cumulativePercentage.findIndex((percentage) => percentage >= 80);
  const barColors = openIssuesCount.map((_, i) =>
    i <= index80 ? "#c1121c" : "#2E5894"
  );

  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      top: "bottom",
      data: [
        { name: "Open Tickets", icon: "rect" },
        { name: "Open Tickets ", icon: "rect" },
        { name: "Percentage", icon: "circle" },
      ]
    },
    xAxis: {
      type: "value",
      min: 0,
      max: openIssuesCount.length + 1,
      interval: 1,
      axisLabel: {
        formatter: (value) => {
          return categories[value - 1] ?? '';
        },
      },
    },
    yAxis: [
      {
        axisTick: { show: true },
        type: "value",
        name: "Open Tickets [-]",
        axisLine: { show: true },
      },
      {
        type: "value",
        name: "Percentage [%]",
        max: 100,
        position: "right",
        splitLine: { show: false },
        axisLine: { show: true },
        axisTick: { show: true },
      },
    ],
    series: [
      {
        name: "Open Tickets",
        type: "bar",
        data: openIssuesCount.map((value, i) => [i + 1, value]),
        yAxisIndex: 0,
        label: {
          show: true,
          position: "top",
          formatter: "{c}",
          color: "#000000",
        },
        itemStyle: {
          color: (params) => barColors[params.dataIndex],
        },
        markLine: {
          symbol: "none",
          data: [
            {
              xAxis: index80 + 1.5,
              lineStyle: {
                color: "#2E5894",
                width: 2,
                type: "dashed",
              },
              label: {
                show: true,
                position: "end",
                formatter: "80% Threshold",
              },
            },
          ],
        },
      },
      {
        name: "Open Tickets ",
        data: [],
        type: "line",
        icon: "rect",
        lineStyle: { width: 0 },
        symbol: "none",
        itemStyle: { color: "#ff0000" },
        emphasis: { disabled: true },
      },
      {
        name: "Percentage",
        type: "line",
        data: cumulativePercentage.map((value, i) => [i + 1, value]),
        yAxisIndex: 1,
        itemStyle: {
          color: "#4CBB17",
        },
        lineStyle: {
          width: 2,
        },
        markLine: {
          symbol: "none",
          data: [
            {
              yAxis: 80,
              yAxisIndex: 1,
              lineStyle: {
                color: "#1F51FF",
                width: 2,
                type: "dashed",
              },
              label: {
                show: true,
                position: "end",
                formatter: "80%",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <ChartWrapper title={'ECharts Pareto'}>
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
