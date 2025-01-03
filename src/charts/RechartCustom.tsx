import { useState } from "react";
import { Data } from "../utils/Data";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

interface DataPoint {
  month: string;
  actual: number;
  greaterOrLess: string;
}

interface Segment {
  start: DataPoint;
  end: DataPoint;
  color: string;
}

export const RechartCustom = () => {
  const [chartData] = useState(Data);

  const processSegments = (data: DataPoint[]): Segment[] => {
    const segments: Segment[] = [];
    for (let i = 0; i < data.length - 1; i++) {
      const current = data[i];
      const next = data[i + 1];
      segments.push({
        start: current,
        end: next,
        color: current.greaterOrLess === "greater" ? "#8884d8" : "#ff7300",
      });
    }
    return segments;
  };

  const segments = processSegments(chartData);

  return (
    <LineChart width={500} height={300} data={chartData}>
      <XAxis dataKey="month" />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Tooltip />

      {/* Render multiple lines for each segment */}
      {segments.map((segment, index) => (
        <Line
          key={index}
          type="monotone"
          data={[segment.start, segment.end]} // Only start and end points
          dataKey="actual" // Assuming the actual value is the key
          stroke={segment.color}
          dot={false} // Hide dots for smoother lines
        />
      ))}
    </LineChart>
  );
};