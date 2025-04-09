import { Chart } from 'react-chartjs-2';
import { ChartWrapper } from '../../../common/chartWrapper';
import { useState } from 'react';
import { ParetoData } from '../../../utils/DataPareto';
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
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController,
  BarController,
  ChartDataLabels,
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


  const barColors = openIssuesCountSorted.map((_, i) =>
    i <= index80 ? "#c1121c" : "#2E5894"
  );
  
  const data = {
    labels: sortedCategories,
    datasets: [
      {
        datalabels: {
        display: false, 
      },
        type: 'line' as const,
        label: 'Percentage',
        data: cumulativePercentage,
        backgroundColor: '#4CBB17',
        borderColor: '#4CBB17',
        borderWidth: 2,
        pointRadius: 3,
        fill: false,
        yAxisID: 'y2',
      }, 
      {
        type: 'bar' as const,
        label: 'Open Tickets',
        data: openIssuesCountSorted,
        backgroundColor: barColors, 
        borderColor: barColors,
        borderWidth: 1,
        datalabels: {
          display: 'auto',
          color: '#000000',
          anchor: 'end',
          align: 'top',
          font: {
            weight: 'bold',
          },
          formatter: Math.round,
        },
      },
    ],
  };
  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Open Tickets [-]',
        },
        max: 40,
          axisLine: { show: true },
      },
      y2: {
        
        position: 'right',
        title: {
          display: true,
          text: 'Percentage [%]',
        },
        max: 100,
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        title: {
          display: true,
          text: 'Categories',
        },
        grid: {
          display: false,
        }
      },
    },
    plugins: {
      annotation: {
        annotations: {
          verticalLine: {
            type: 'line',
            value: index80 + 0.5,
            scaleID: 'x',
            borderColor: '#2E5894',
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              content: '80% Threshold',
              enabled: true,
              position: 'top',
              backgroundColor: '#2E5894',
              color: '#fff',
            },
          },
          horizontalLine: {
            type: 'line',
            scaleID: 'y2',
            value: 80,
            borderColor: '#2E5894',
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              content: '80% Line',
              enabled: true,
              position: 'left',
              backgroundColor: '#2E5894',
              color: '#fff',
            },
          },
        },
      },
    },
  };
  

  return (
    <ChartWrapper title={'Chart.js Pareto'}>
        {({ width, height }) => (
      <Chart type='bar' data={data} options={options} style={{width, height}}/>
        )}
    </ChartWrapper>
  );
};
