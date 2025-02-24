import { Chart } from 'react-chartjs-2';
import { ChartWrapper } from '../../common/chartWrapper';
import { useState } from 'react';
import { ParetoData } from '../../utils/DataPareto';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController,
  BarController,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController,
  BarController,
  Tooltip,
  Legend,
  annotationPlugin // Register annotation plugin
);

export const ChartjsPareto = () => {
  const [chartData] = useState(ParetoData);
  const categories = Array.from(new Set(chartData.map((data) => data.group)));

  // Filter out issues with status "Done" and count open issues for each group
  const openIssuesCount = categories.map(
    (category) =>
      chartData.filter(
        (data) => data.group === category && data.status !== 4
      ).length
  );

  // Sort categories based on open issue count
  const sortedData = categories
    .map((category, index) => ({ category, count: openIssuesCount[index] }))
    .sort((a, b) => b.count - a.count);

  const sortedCategories = sortedData.map((item) => item.category);
  const openIssuesCountSorted = sortedData.map((item) => item.count);

  // Calculate cumulative percentage for the line graph
  const totalOpenIssues = openIssuesCountSorted.reduce((acc, count) => acc + count, 0);
  let cumulativeSum = 0;
  const cumulativePercentage = openIssuesCountSorted.map((count) => {
    cumulativeSum += count;
    return Math.floor((cumulativeSum / totalOpenIssues) * 100);
  });

  // Find the index where the cumulative percentage reaches or exceeds 80%
  const index80 = cumulativePercentage.findIndex((percentage) => percentage >= 80);
  console.log('Index where cumulative percentage reaches or exceeds 80%:', index80);

  const data = {
    labels: sortedCategories,
    datasets: [
     
      {
        type: 'line' as const,
        label: 'Percentage',
        data: cumulativePercentage,
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        pointRadius: 3,
        fill: false,
        yAxisID: 'y2',
      }, 
      {
        type: 'bar' as const,
        label: 'Open Tickets',
        data: openIssuesCountSorted,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Open Tickets [-]',
        },
        max: 40,
      },
      y2: {
        beginAtZero: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Percentage [%]',
        },
        max: 100,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
            display: false 
        }
    }
    },
    plugins: {
      annotation: {
        annotations: {
          verticalLine: {
            type: 'line',
            value: index80 + 0.5,
            scaleID: 'x',
            borderColor: '#FF4560',
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              content: '80% Threshold',
              enabled: true,
              position: 'top',
              backgroundColor: '#FF4560',
              color: '#fff',
            },
          },
          horizontalLine: {
            type: 'line',
            scaleID: 'y2', // ✅ Corrected spelling (lowercase "s")
            value: 80,
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            borderDash: [6, 6], // Optional for visibility
            label: {
              content: '80% Line',
              enabled: true,
              position: 'left',
              backgroundColor: 'rgb(255, 99, 132)',
              color: '#fff',
            },
          },
        },
      },
    },
  };
  

  return (
    <ChartWrapper title={'Chart.js Pareto'}>
      <Chart type='bar' data={data} options={options} />
    </ChartWrapper>
  );
};
