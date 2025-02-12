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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController,
  BarController,
  Tooltip,
  Legend
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

  const data = {
    labels: categories,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Open Tickets',
        data: openIssuesCount,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        type: 'line' as const,
        label: 'Percentage',
        data: cumulativePercentage,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        yAxisID: 'y-axis-2',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Open Tickets',
        },
      },
      'y-axis-2': {
        beginAtZero: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Percentage',
        },
        max: 100,
      },
    },
    plugins: {
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: 0,
            yMax: 100,
            xMin: index80 + 0.5,
            xMax: index80 + 0.5,
            borderColor: '#FF4560',
            borderWidth: 2,
            label: {
              content: '80% Threshold',
              enabled: true,
              position: 'center',
              backgroundColor: '#FF4560',
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