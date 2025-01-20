import React, { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Data } from "../../utils/Data";

export const LineChartMui = () => {
  const [chartData] = useState(Data);

  /* 
  useEffect(() => {
    console.log("Chart Data:", chartData);
  }, [chartData]);

  */
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
