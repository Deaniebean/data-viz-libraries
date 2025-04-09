import ReactECharts from 'echarts-for-react';
import { ChartWrapper } from '../../../common/chartWrapper';
import { useState } from 'react';
import { ParetoData } from '../../../utils/DataPareto';

export const EchartsPareto = () => {
  const [chartData] = useState(ParetoData);
  const categories = Array.from(new Set(chartData.map((data) => data.group)));

  // Filter out issues with status "Done" and count open issues for each group
  const openIssuesCount = categories.map(
    (category) =>
      chartData.filter(
        (data) => data.group === category && data.status !== 4
      ).length
  );
  openIssuesCount.sort((a, b) => b - a);

  // Calculate cumulative percentage for the line graph
  const totalOpenIssues = openIssuesCount.reduce((acc, count) => acc + count, 0);
  let cumulativeSum = 0;
  const cumulativePercentage = openIssuesCount.map((count) => {
    cumulativeSum += count;
    return Math.floor((cumulativeSum / totalOpenIssues) * 100);
  });

  // Find the index where the cumulative percentage reaches or exceeds 80%
  const index80 = cumulativePercentage.findIndex((percentage) => percentage >= 80);
  console.log('Index where cumulative percentage reaches or exceeds 80%:', index80);
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
    },
    xAxis: {
      type: "value",
      min: 0,
      max: openIssuesCount.length + 1,
      interval: 1,
      axisLabel: {
        formatter: (value) => {
          // Convert value (1, 2, 3, ...) to category names
          return categories[value - 1] ?? '';
        },
      },
    },
    yAxis: [
      {
        axisTick: {
          show: true,
        },
        type: "value",
        name: "Open Tickets [-]",
        axisLine: { show: true },
      },
      {
        type: "value",
        name: "Percentage [%]",
        max: 100,
        position: "right",
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisTick: {
          show: true,
        },
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
              xAxis: index80 + 1.5, // Position of the marker line between bars
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
        <ReactECharts option={options} style={{ width, height }} />
      )}
    </ChartWrapper>
  );
};
