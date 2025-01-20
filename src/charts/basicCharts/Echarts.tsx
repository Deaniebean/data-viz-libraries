//$ npm install echarts-for-react decided against it because no resize
import ReactECharts from "echarts-for-react";
import { Data } from "../../utils/Data";
import { useState } from "react";

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
        smooth: true,
      },
      {
        data: chartData.map((data) => data.target),
        type: "line",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  return (
    <div className="echarts">
      <h1>Echarts</h1>
        <div style={{ width: "800px", height: "600px" }}>
      <ReactECharts option={options} />
    </div>
    </div>
  );
};

/*

  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  return <ReactECharts option={options} />;
};

*/
