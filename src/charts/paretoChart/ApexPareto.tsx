import Chart from 'react-apexcharts';
import { ChartWrapper } from '../../common/chartWrapper';
import { useState } from 'react';
import { ParetoData } from '../../utils/DataPareto';

// data preparation: I want the bar chart to show all open issues (which means any status apart from done) for each group as category

export const ApexPareto = () => {

  const [chartData] = useState(ParetoData);
  const categories = Array.from(new Set(chartData.map((data) => data.group)));

   // Filter out issues with status "Done" and count open issues for each group
   const openIssuesCount = categories.map(
    (category) =>
      chartData.filter(
        (data) => data.group === category && data.status !== 4
      ).length
  );

  const options = {
    chart: {
      type: 'line' as const,
      height: 350,
    },
    stroke: {
      width: [4, 4],
      curve: 'smooth' as const,
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: categories,
    },
    yaxis: [{
      title: {
        text: 'Income',
      }
    }, {
      title: {
        text: 'Expenses',
      },
      opposite: true
    }]
  };
  const series = [
    {
      name: 'Income',
      type: 'column',
      data: openIssuesCount,
    },
    {
      name: 'Expenses',
      type: 'line',
      data: [20, 30, 25, 40, 45, 55, 65]
    }
  ];

  return (
   <ChartWrapper title={'ApexCharts Pareto'}>
<Chart options={options} series={series} type="line"></Chart>
</ChartWrapper>
  );
};

