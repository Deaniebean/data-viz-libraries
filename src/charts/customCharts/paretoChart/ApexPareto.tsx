import Chart from 'react-apexcharts';
import { ChartWrapper } from '../../../common/chartWrapper';
import { useState } from 'react';
import { ParetoData } from '../../../utils/DataPareto';

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
  const barColors = openIssuesCountSorted.map((_, i) =>
    i <= index80 ? "#c1121c" : "#2E5894"
  );

  const options = {
    chart: {
      type: 'bar' as const,
      toolbar: {
        show: false
      }
    },

    xaxis: {
      type: 'numeric' as const,
      labels: {
        formatter: function (value: string) {
          const numericValue = parseInt(value, 10);
          // Map numeric values (1, 2, 3, ...) to category names
          return categories[numericValue - 1] ?? '';
        },
      },
    },
    yaxis: [
      {
        title: {
          text: 'Open Tickets [-]',
        },
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        }
      },
      {
        title: {
          text: 'Percentage [%]',
        },
        opposite: true,
        max: 100, 
        min: 0,
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        }
      }
    ],
    stroke: {
      width: [0, 0, 3] //bar width=0, dummy data width= 0, line width=3
    },
    legend: {
      show: true,    
      markers: {
        fillColors: ["#c1121c", "#2E5894","#14b425" ],
      },
    },

    annotations: {
      xaxis: [
        {
          x: index80 + 1.5,
          borderColor: '#2E5894',
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
          borderColor: '#2E5894',
          strokeDashArray: 4,
          borderWidth: 2, 
          label: {
            borderColor: '#00E396',
            style: {
              color: '#fff',
              background: '#00E396',
            },
          },
        }
      ]
    }
  };

  const series = [
    {
      name: 'Open Tickets',
      type: 'bar',
      data: openIssuesCountSorted,
      color: ({ dataPointIndex }: { dataPointIndex: number }) => barColors[dataPointIndex] as string, 
    },
    {
      name: 'Open Tickets',
      data: [],
      type: 'line',
      legendLabels: {
        show: true,
        name: "Open Tickets",
      },
    },
    {
      name: 'Percentage',
      type: 'line',
      data: cumulativePercentage,
      color: '#4CBB17',
    },
  ];

  return (
    <ChartWrapper title={'ApexCharts Pareto'}>
      {({ width, height }) => (
        //@ts-expect-error the series.color expected type is a string but we are passing a function, which is working as expected, but not included as a type
        <Chart options={options} series={series} type="line" width={width} height={height}></Chart>
      )}
    </ChartWrapper>
  );
};
