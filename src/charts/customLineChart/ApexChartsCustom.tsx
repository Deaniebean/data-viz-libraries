import Chart from "react-apexcharts";
import { Data } from "../../utils/DataLineChart";
import { useState} from "react";
import { ChartWrapper } from "../../common/chartWrapper";

export const ApexChartsCustom = () => {
  const [chartData] = useState(Data);


  const allMonths: string[] = chartData.map((data) => data.month);

  // Create a series where each point fills non-active values with null
  const series = chartData.map((dataPoint, index) => {
    const data = Array(12).fill(null); // Create a null array with 12 slots
    data[allMonths.indexOf(dataPoint.month)] = dataPoint.actual; // Place actual value at the correct index

    // If there's an index on the right (next month), add the next actual value
    if (index < chartData.length - 1) {
      const nextMonthIndex = allMonths.indexOf(chartData[index + 1].month);
      if (nextMonthIndex > allMonths.indexOf(dataPoint.month)) {
        data[nextMonthIndex] = chartData[index + 1].actual;
      }
    }

    return {
      name: dataPoint.month,
      data: data,
    };
  });

  const chartOptions = {
    chart: {
      id: "dynamic-threshold",
      animations: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    colors: chartData.map((data) =>
      data.actual > data.target ? "#14b425" : "#ff0000"
    ),
    xaxis: {
      categories: allMonths,
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      min: 0,
    },
    markers: {
      size: 4,
    },
  };

  return (
    <ChartWrapper title="ApexCharts Custom">
      <Chart
        type="line"
        options={chartOptions}
        series={series}
      />
    </ChartWrapper>
  );
};
