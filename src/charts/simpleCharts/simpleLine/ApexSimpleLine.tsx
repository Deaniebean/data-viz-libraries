import Chart from "react-apexcharts";
export const ApexSimple = () => {
  const chartData: {
    series: { name: string; data: number[] }[];
    options: ApexCharts.ApexOptions;
  } = {
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

      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        style={{ width: "60%", height: "600px" }} 
        
      />
  );
};