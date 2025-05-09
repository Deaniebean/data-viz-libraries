import ReactECharts from "echarts-for-react/lib/core";
import { Data } from "../../utils/DataLineChart";
import { useState } from "react";
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from "echarts/components";
import { ChartWrapper } from "../../common/chartWrapper";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import * as echarts from "echarts/core";

echarts.use([
  // Register only the required components
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer,
]);


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
        <ReactECharts  echarts={echarts} option={options} style={{width, height}}/>
      )}
    </ChartWrapper>
  );
};


