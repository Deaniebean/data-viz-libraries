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

  const openIssuesCountSorted = openIssuesCount.sort((a, b) => b - a);
  // Calculate cumulative percentage for the line graph
  const totalOpenIssues = openIssuesCount.reduce((acc, count) => acc + count, 0);
  let cumulativeSum = 0;
  const cumulativePercentage = openIssuesCount.map((count) => {
    cumulativeSum += count;
    return Math.floor((cumulativeSum / totalOpenIssues) * 100);
  });

    // Find the index where the cumulative percentage reaches or exceeds 80%
    const index80 = cumulativePercentage.findIndex((percentage) => percentage >= 80);

  const options = {
    chart: {
      type: 'line' as const,
      height: 350,
      toolbar: {
        show: false
      }
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
        text: 'Open Tickets [-]',
      }
    }, {
      title: {
        text: 'Percentage [%]',
      },
      opposite: true,
      max: 100, 
      min: 0
    }],
    annotations: {
      xaxis: [
        {
          x: categories[index80],
          borderColor: '#FF4560',
          borderWidth: 3, 
          label: {
            borderColor: '#FF4560',
            style: {
              color: '#fff',
              background: '#FF4560',
            },
          }
        }
      ],
      yaxis: [
        {
          y: 80,
          yAxisIndex: 1, 
          borderColor: '#FF4560',
          strokeDashArray: 4,
          offsetX: -150,
          borderWidth: 2, 
          width: '155%',
          label: {
            borderColor: '#00E396',
            style: {
              color: '#fff',
              background: '#00E396',
            },
          }
        }
      ]
    }
  };
  const series = [
    {
      name: 'Open Tickets',
      type: 'bar',
      data: openIssuesCountSorted,
      color: '#4BC0C0',
    },
    {
      name: 'Percentage',
      type: 'line',
      data: cumulativePercentage,
      color: '#FF6384'
    }
  ];

  return (
  <ChartWrapper title={'ApexCharts Pareto'}>
    <Chart options={options} series={series} type="line"></Chart>
  </ChartWrapper>
  );
};

