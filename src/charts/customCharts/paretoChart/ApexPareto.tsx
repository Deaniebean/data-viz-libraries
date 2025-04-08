import Chart from 'react-apexcharts';
import { ChartWrapper } from '../../../common/chartWrapper';
import { useState } from 'react';
import { ParetoData } from '../../../utils/DataPareto';

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
    const barColors = openIssuesCountSorted.map((_, i) =>
      i <= index80 ? "#c1121c" : "#2E5894"
    );
    
    const options = {
      chart: {
        type: 'bar' as const,
        height: 350,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          distributed: false, // Prevents ApexCharts from overriding colors
        }
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: categories,
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
         width: [0, 3] 
      },
      fill: {
        opacity: 1, // Ensure solid colors
      },
      annotations: {
        xaxis: [
          {
            x: categories[index80],
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
            width: '120%',
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
        color: ({ dataPointIndex }: { dataPointIndex: number }) => barColors[dataPointIndex], // Ensures correct color mapping
      },
      {
        name: 'Percentage',
        type: 'line',
        data: cumulativePercentage,
        color: '#4CBB17'
      }
    ];
   
    
    
    
  return (
  <ChartWrapper title={'ApexCharts Pareto'}>
     {({ width, height }) => (
    <Chart options={options} series={series} type="line" style={{width,height}}></Chart>
     )}
  </ChartWrapper>
  );
};

