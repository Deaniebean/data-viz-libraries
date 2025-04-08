import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Data } from "../../utils/DataLineChart";
import { ChartWrapper } from "../../common/chartWrapper";

export const Rechart = () => {
  const [chartData] = useState(Data);

  return (
    <ChartWrapper title="Recharts">
      {() => (
        <div style={{ width: "100%", height: "100%", minWidth: "300px", minHeight: "300px" }}>
          <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid />
              <Line type="monotone" dataKey="target" stroke="#8884d8" />
              <Line type="monotone" dataKey="actual" stroke="#82ca9d" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartWrapper>
  );
};