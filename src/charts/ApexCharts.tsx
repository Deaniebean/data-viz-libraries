import Chart from "react-apexcharts";
import { Data } from "../utils/Data";
import { useState } from "react";

export const ApexCharts = () => {
  const [chartData] = useState(Data);
  const chartOptions = {
    chart: {
      id: 'dynamic-threshold',
    },
    xaxis: {
      categories: chartData.map((data) => data.month),
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      min: 0,
    },
    stroke: {
      curve: 'smooth',
      colors: chartData.map((data) => {
        return function({ value }: { value: any }) {
          if (value < data.target) {
            return '#7E36AF';
          } else {
            return '#D9534F';
          }
        };
      })
    },
      
    markers: {
      size: 5,
    },
    series: [{
      name: 'series-1',
      data: chartData.map((data) => ({
        x: data.month,
        y: data.actual,
      })),
    }],
    annotations: {
      yaxis: [
        {
          y: 49,
          borderColor: '#00E396',
          label: {
            borderColor: '#00E396',
            style: {
              color: '#fff',
              background: '#00E396'
            },
            text: 'Y-axis annotation on 8800'
          }
        }
      ]
    },
    /*
    plotOptions: {
      line: {
        colors: chartData.map((data) => (data.actual > data.target ? '#0088ee' : '#ff0000')),
      },
    },
    */
  };

  return (
    <Chart
    type="line"
    options={chartOptions}
    series={chartOptions.series}
    width="500"
  />
  );
};