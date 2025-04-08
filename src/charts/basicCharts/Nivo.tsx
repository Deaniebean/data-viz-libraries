import { ResponsiveLine } from "@nivo/line";
import { Data, DataType } from "../../utils/DataLineChart";
import { useState } from "react";
import { ChartWrapper } from "../../common/chartWrapper";

export const Nivo = () => {
  const [chartData] = useState(() => {
    return [
      {
        id: "target",
        data: Data.map((item: DataType) => ({ x: item.month, y: item.target })),
      },
      {
        id: "actual",
        data: Data.map((item: DataType) => ({ x: item.month, y: item.actual })),
      },
    ];
  });

  return (
    <ChartWrapper title="Nivo">
      {({ width, height }) => (
        <div style={{ width, height }}>
          <ResponsiveLine
            data={chartData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
          />
        </div>
      )}
    </ChartWrapper>
  );
};