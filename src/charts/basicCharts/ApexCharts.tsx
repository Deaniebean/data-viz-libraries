import Chart from "react-apexcharts";
import { Data } from "../../utils/DataLineChart";
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
  xaxis: {
    type: "category" as const,
    categories: chartData.map((data) => data.month as string),
  }
};
  return (
    <ChartWrapper title={"ApexCharts"}>
    {({ width, height }) => (
      <Chart
      type="line"
      options={chartOptions}
      series={chartOptions.series}
      style={{width, height}}
      />
    )}
    </ChartWrapper>
  );
};