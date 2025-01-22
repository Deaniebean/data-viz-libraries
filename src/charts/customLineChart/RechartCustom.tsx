import { useState } from "react";
import { Data } from "../../utils/Data";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { ChartWrapper } from "../../common/chartWrapper";
import React from "react";

export const RechartCustom = () => {
  const [chartData] = useState(Data);

  // Calculate the gradient stops based on the data
  const gradientStops = chartData.map((data, index) => {
    const nextData = chartData[index + 1];
    if (!nextData) return null;

    const isAboveTarget = data.actual > data.target;
    const nextIsAboveTarget = nextData.actual > nextData.target;

    return {
      offset: (index / (chartData.length - 1)) * 100,
      color: isAboveTarget ? "green" : "red",
      nextColor: nextIsAboveTarget ? "green" : "red",
    };
  }).filter(Boolean);

  return (
    <ChartWrapper title="Recharts Custom">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
              {gradientStops.map((stop, index) => (
                <React.Fragment key={index}>
                  {stop && <stop offset={`${stop.offset}%`} stopColor={stop.color} />}
                  {stop && <stop offset={`${stop.offset + 0.1}%`} stopColor={stop.nextColor} />}
                </React.Fragment>
              ))}
            </linearGradient>
          </defs>
          <Line type="monotone" dataKey="actual" stroke="url(#gradient)" dot={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};