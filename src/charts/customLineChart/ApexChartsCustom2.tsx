import Chart from "react-apexcharts";
import { Data } from "../../utils/DataLineChart";
import { useState, useEffect } from "react";
import { ChartWrapper } from "../../common/chartWrapper";

export const ApexChartsCustom2 = () => {
  const [chartData] = useState(Data);

  useEffect(() => {
    console.log("Initial chartData:", chartData);
  }, [chartData]);

  const allMonths: string[] = chartData.map((data) => data.month);
  console.log("All months:", allMonths);

  // Create a series where each point fills non-active values with null
  const series = [
    {
      name: "Actual",
      data: chartData.map((data) => data.actual),
    },
    {
      name: "Target",
      data: chartData.map((data) => data.target),
    },
  ];

  console.log("Series data:", series);

  const colorStops = chartData
    .map((data, index) => {
      const nextData = chartData[index + 1];
      if (!nextData) return null;

      const isAboveTarget = data.actual >= data.target;
      const nextIsAboveTarget = nextData.actual >= nextData.target;

      const colorStop = {
        offset: (index / (chartData.length - 1)) * 100,
        color: isAboveTarget ? "#14b425" : "#ff0000",
        nextColor: nextIsAboveTarget ? "#14b425" : "#ff0000",
      };

      console.log(`Color stop for month ${data.month}:`, colorStop);

      return colorStop;
    })
    .filter((colorStop) => colorStop !== null);

  console.log("Color stops:", colorStops);

  const chartOptions = {
    chart: {
      id: "dynamic-threshold",
      animations: {
        enabled: false,
      },
      toolbar: {
        show: false
      }
    },
    fill: {
      type: ["gradient", "solid"],
      colors: ["#000000"],
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
        colorStops: colorStops.flatMap((stop) => [
          { offset: stop.offset, color: stop.color, opacity: 1 },
          { offset: stop.offset + 0.1, color: stop.nextColor, opacity: 1 },
        ]),
      },
    },
    stroke: {
      dashArray: [0, 5],
    },
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

  console.log("Chart options:", chartOptions);

  return (
    <ChartWrapper title="ApexCharts Custom">
      <Chart
        type="line"
        options={chartOptions}
        series={series}
        width="100%"
        height="100%"
      />
    </ChartWrapper>
  );
};
