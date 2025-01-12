import Chart from "react-apexcharts";
import { Data } from "../utils/Data";
import { useState } from "react";

export const ApexCharts = () => {
  const [chartData] = useState(Data);
  


var chartOptions = {

  series: [
    {
      name: "Actual",
      data: chartData.map((data) => data.actual), 
    },
  ],
  chart: {
    height: 350,

  },
  colors: ["#00E396"],
  xaxis: {
    type: "category" as const,
    categories: chartData.map((data) => {data.month as string}),
  }
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