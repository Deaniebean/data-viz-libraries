import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { ChartWrapper } from "../../../common/chartWrapper";


echarts.use([LineChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

export const EChartsSimple = () => {
  const options = {
    title: {
      text: "KPI's 2024",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Target", "Actual"],
      bottom: 0,
    },
    xAxis: {
      type: "category",
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Target",
        type: "line",
        data: [3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4],
        itemStyle: {
          color: "rgba(75,192,192,1)",
        },
        lineStyle: {
          width: 2,
        },
      },
      {
        name: "Actual",
        type: "line",
        data: [2, 3, 4, 2, 5, 4, 5, 5, 6, 5, 4, 3],
        itemStyle: {
          color: "rgba(255,99,132,1)",
        },
        lineStyle: {
          width: 2,
        },
      },
    ],
  };

   return (
      <ChartWrapper title="ECharts">
        {({ width, height }) => (
          <ReactEChartsCore
            echarts={echarts}
            option={options}
            style={{ width, height }}
          />
        )}
      </ChartWrapper>
    );
};
