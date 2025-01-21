import Chart from "react-apexcharts";
import { Data } from "../../utils/Data";
import { useState } from "react";
import { ChartWrapper } from "../../common/chartWrapper";

export const ApexCharts = () => {
  const [chartData] = useState(Data);
  


const chartOptions = {

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
    categories: chartData.map((data) => data.month as string),
  }
};
  return (
    <ChartWrapper title={"ApexCharts"}>
    <Chart
    type="line"
    options={chartOptions}
    series={chartOptions.series}
    width="100%"
  /></ChartWrapper>
  );
};