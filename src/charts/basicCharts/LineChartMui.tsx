import { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Data } from "../../utils/DataLineChart";
import { ChartWrapper } from "../../common/chartWrapper";

export const LineChartMui = () => {
  const [chartData] = useState(Data);

  return (
    <ChartWrapper title="Line Chart Mui">
      {({ width, height }) => (
      <div style={{ width, height }}>
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
      )}
    </ChartWrapper>
  );
};
