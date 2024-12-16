import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Data } from "../utils/Data";
import { data } from "react-router-dom";

export const LineChartMui = () => {
  const [chartData] = useState(Data);

  // Print the chart data to the console
  useEffect(() => {
    console.log("Chart Data:", chartData);
  }, [chartData]);

  const hello = chartData.map((item) => item.month);
  console.log(hello);

  return (
    <div className="mui">
      <h1>MUI Line Chart</h1>
      <div style={{ width: "800px", height: "600px" }}>
        <LineChart
          xAxis={[
            {
              scaleType: "point",
              dataKey: "month",
            },
          ]}
          series={[
            { dataKey: "actual", label: "Actual", color: "#82ca9d" },
            { dataKey: "target", label: "Target", color: "#8884d8" },
          ]}
          dataset={chartData}
        />
      </div>
    </div>
  );
};
//        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
