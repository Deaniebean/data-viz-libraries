import Chart from "react-apexcharts";
import { ChartWrapper } from "../../common/chartWrapper";
import { useState } from "react";
import { ParetoData } from "../../utils/DataPareto";

export const ApexPareto = () => {
  const [chartData] = useState(ParetoData);
  const categories = Array.from(new Set(chartData.map((data) => data.group)));

  // Filter out issues with status "Done" and count open issues for each group
  const openIssuesCount = categories.map(
    (category) =>
      chartData.filter((data) => data.group === category && data.status !== 4)
        .length
  );

  // Calculate cumulative percentage for the line graph
  const totalOpenIssues = openIssuesCount.reduce((acc, count) => acc + count, 0);
  let cumulativeSum = 0;
  const cumulativePercentage = openIssuesCount.map((count) => {
    cumulativeSum += count;
    return Math.floor((cumulativeSum / totalOpenIssues) * 100);
  });

  // Find the index where the cumulative percentage reaches or exceeds 80%
  const index80 = cumulativePercentage.findIndex((percentage) => percentage >= 80);

  const options = {
    chart: {
      type: "line" as const,
      height: 350,
    },
    stroke: {
      width: [4, 4],
      curve: "smooth" as const,
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: categories,
    },
    yaxis: [
      {
        title: {
          text: "Open Tickets",
        },
      },
      {
        title: {
          text: "Percentage",
        },
        opposite: true,
        max: 100,
      },
    ],
  };

  const series = [
    {
      name: "Open Tickets",
      type: "column",
      data: openIssuesCount,
    },
    {
      name: "Percentage",
      type: "line",
      data: cumulativePercentage,
    },
  ];

  return (
    <ChartWrapper title={"ApexCharts Pareto"}>
      <div style={{ position: "relative", width: "800px", height: "600px" }}>
        <Chart options={options} series={series} type="line" />

        {/* Overlay line positioned between bars */}
        <div
          style={{
            position: "absolute",
            left: `${(index80 + 1) / categories.length * 100}%`, // Convert index to percentage
            top: 0,
            height: "100%",
            width: "2px",
            background: "red",
            zIndex: 10, // Make sure it's above the chart
          }}
        />
      </div>
    </ChartWrapper>
  );
};
