import ReactECharts from 'echarts-for-react';
import { ChartWrapper } from '../../common/chartWrapper';
import { useState } from 'react';
import { ParetoData } from '../../utils/DataPareto';

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
  openIssuesCount.sort((a,b) => b-a)

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

  const options = {
    title: {
      text: 'Pareto Chart',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      type: 'category',
      data: categories,
    },
    yAxis: [
      {
        type: 'value',
        name: 'Open Tickets',
      },
      {
        type: 'value',
        name: 'Percentage',
        max: 100,
        position: 'right',
      },
    ],
    series: [
      {
        name: 'Open Tickets',
        type: 'bar',
        data: openIssuesCount,
        yAxisIndex: 0,
        itemStyle: {
          color: 'rgba(75, 192, 192, 0.8)',
        },
      },
      {
        name: 'Percentage',
        type: 'line',
        data: cumulativePercentage,
        yAxisIndex: 1,
        itemStyle: {
          color: 'rgba(255, 99, 132, 0.8)',
        },
        lineStyle: {
          width: 2,
        },
      },
    ],
    markLine: {
      data: [
        {
          xAxis: index80 + 0.5,
          lineStyle: {
            color: '#FF4560',
            width: 2,
          },
          label: {
            show: true,
            position: 'end',
            formatter: '80% Threshold',
            color: '#FF4560',
          },
        },
      ],
    },
  };

  return (
    <ChartWrapper title={'ECharts Pareto'}>
      <ReactECharts option={options} style={{ height: '600px', width: '100%' }} />
    </ChartWrapper>
  );
};