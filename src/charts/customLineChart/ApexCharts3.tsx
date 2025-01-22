import Chart from "react-apexcharts";
import { ChartWrapper } from "../../common/chartWrapper";

export const CustomApexCharts3 = () => {
  const options = {
    chart: {
      height: 380,
      type: "line" as const,
      foreColor: "#6D6D6D",
    },
    fill: {
      type: ["gradient", "solid"],
      colors: ["#000000"],
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 1,
        colorStops: [
          {
            offset: 0,
            color: "#EB656F",
            opacity: 1,
          },
          {
            offset: 20,
            color: "#FAD375",
            opacity: 1,
          },
          {
            offset: 60,
            color: "#61DBC3",
            opacity: 1,
          },
          {
            offset: 100,
            color: "#95DA74",
            opacity: 1,
          },
        ],
      },
    },
    grid: {
      borderColor: "#6D6D6D",
    },
    xaxis: {
      categories: [
        "01 Jan",
        "02 Jan",
        "03 Jan",
        "04 Jan",
        "05 Jan",
        "06 Jan",
        "07 Jan",
      ],
    },
  };

  const series = [
    {
      name: "Series 1",
      data: [2, 23, 19, 45, 38, 52, 45],
    },
    { name: "Series 2", data: [10, 20, 20, 30, 40, 40, 30] },
  ];

  return (
    <ChartWrapper title="ApexCharts Custom">
      <Chart
        type="line"
        options={options}
        series={series}
        width="100%"
        height="100%"
      />
    </ChartWrapper>
  );
};
