import Chart from "react-apexcharts";
import { ChartWrapper } from "../common/chartWrapper";

export const ApexSimple = () => {
  const chartData = {
    series: [
      {
        name: "Actual",
        data: [2, 3, 4, 2, 5, 4, 5, 5, 6, 5, 4, 3],
      },
      {
        name: "Target",
        data: [3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        show: true,
      },
    },
  };

  return (
    <ChartWrapper title="Simple Chart ApexCharts">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </ChartWrapper>
  );
};