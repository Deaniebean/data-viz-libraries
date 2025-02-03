import Plot from "react-plotly.js";
import { Data } from "../../utils/DataLineChart";
import { ChartWrapper } from "../../common/chartWrapper";

export const PlotlyChart = () => {
  const chartData = Data;

  return (
    <ChartWrapper title="Plotly Chart">
      <Plot
        data={[
          {
            x: chartData.map((data) => data.month),
            y: chartData.map((data) => data.actual),
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
          },
          {
            x: chartData.map((data) => data.month),
            y: chartData.map((data) => data.target),
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "green" },
          },
        ]}
        layout={{ title: "KPI tracker" }}
        config={{ responsive: true }}
      />
    </ChartWrapper>
  );
};
