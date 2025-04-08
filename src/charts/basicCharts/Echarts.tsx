//$ npm install echarts-for-react decided against it because no resize
import ReactECharts from "echarts-for-react";
import { Data } from "../../utils/DataLineChart";
import { useState } from "react";
import { ChartWrapper } from "../../common/chartWrapper";

export const Echarts = () => {
  const [chartData] = useState(Data);
  const options = {
    grid: { top: 20, right: 20, bottom: 20, left: 30 },
    xAxis: {
      type: "category",
      data: chartData.map((data) => data.month),
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      axisLine: { show: true },
    },
    series: [
      {
        data: chartData.map((data) => data.actual),
        type: "line",
        //smooth: true,
      },
      {
        data: chartData.map((data) => data.target),
        type: "line",
        //smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  return (
    <ChartWrapper title="Echarts">
      {({ width, height }) => (
        <ReactECharts option={options} style={{width, height}}/>
      )}
    </ChartWrapper>
  );
};


