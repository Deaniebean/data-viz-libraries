import ReactECharts from "echarts-for-react";
import { ChartWrapper } from "../../../common/chartWrapper";

// Define colors for statuses
const statusColors = {
  "Backlog": "#808080", // Grey
  "In Progress": "#FFA500", // Orange
  "In Review": "#FF69B4", // Pink
  "Done": "#008000", // Green
};

// Define nodes
const nodes = ["Backlog", "In Progress", "In Review", "Done"].flatMap((status, depth) => 
  Array.from({ length: 4 }, (_, i) => ({
    name: `${i + 1}_${status}`,
    displayName: status,
    depth,
    fixed: true,
    itemStyle: { color: statusColors[status as keyof typeof statusColors] },
  }))
);

// Define links
const links = [
  { source: "2_Backlog", target: "3_Backlog", value: 1, group: "B-Class" },
  { source: "3_Backlog", target: "4_Backlog", value: 14, group: "B-Class" },
  { source: "2_Backlog", target: "3_In Progress", value: 25, group: "A-Class" },
  { source: "3_In Progress", target: "4_In Progress", value: 21, group: "A-Class" },
  { source: "1_Backlog", target: "2_In Progress", value: 28, group: "C-Class" },
  { source: "1_Backlog", target: "2_Backlog", value: 8, group: "B-Class" },
  { source: "1_Backlog", target: "2_Backlog", value: 3, group: "A-Class" },
  { source: "2_In Progress", target: "3_In Review", value: 25, group: "C-Class" },
  { source: "3_In Review", target: "4_Done", value: 12, group: "C-Class" },
  { source: "1_Done", target: "2_Done", value: 12, group: "D-Class" },
  { source: "2_Done", target: "3_Done", value: 13, group: "D-Class" },
  { source: "3_Done", target: "4_Done", value: 13, group: "D-Class" },
  { source: "2_In Progress", target: "3_In Progress", value: 3, group: "C-Class" },
  { source: "3_In Progress", target: "4_Done", value: 2, group: "C-Class" },
  { source: "1_In Review", target: "2_Done", value: 1, group: "D-Class" },
  { source: "1_Backlog", target: "2_In Progress", value: 1, group: "D-Class" },
  { source: "2_In Progress", target: "3_In Review", value: 1, group: "D-Class" },
  { source: "3_In Review", target: "4_Done", value: 1, group: "D-Class" },
  { source: "3_In Review", target: "4_In Review", value: 13, group: "C-Class" },
  { source: "1_In Progress", target: "2_In Review", value: 1, group: "D-Class" },
  { source: "2_In Review", target: "3_In Review", value: 1, group: "D-Class" },
  { source: "3_In Review", target: "4_In Review", value: 1, group: "D-Class" },
  { source: "2_Backlog", target: "3_Backlog", value: 1, group: "A-Class" },
  { source: "3_Backlog", target: "4_Backlog", value: 13, group: "A-Class" },
  { source: "2_Backlog", target: "3_In Progress", value: 13, group: "B-Class" },
  { source: "3_In Progress", target: "4_In Progress", value: 12, group: "B-Class" },
  { source: "3_In Progress", target: "4_In Review", value: 1, group: "C-Class" },
  { source: "3_In Progress", target: "4_Done", value: 1, group: "B-Class" },
  { source: "1_Backlog", target: "2_Backlog", value: 10, group: "D-Class" },
  { source: "2_Backlog", target: "3_In Progress", value: 10, group: "D-Class" },
  { source: "3_In Progress", target: "4_In Progress", value: 9, group: "D-Class" },
  { source: "3_In Progress", target: "4_In Review", value: 1, group: "D-Class" },
  { source: "3_In Progress", target: "4_In Review", value: 4, group: "A-Class" },
];

// Apply colors to links with gradient transition for relevant ones
const styledLinks = links.map((link) => {
  const sourceNode = nodes.find((node) => node.name === link.source);
  const targetNode = nodes.find((node) => node.name === link.target);
  const isRelevant = link.group !== "C-Class" && link.group !== "D-Class";

  return {
    ...link,
    lineStyle: isRelevant
      ? {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: sourceNode?.itemStyle.color || "#000" },
              { offset: 1, color: targetNode?.itemStyle.color || "#000" },
            ],
          },
          opacity: 0.75, 
        }
      : {
          color: "#808080", // Grey for C-Class & D-Class
        },
  };
});

const options = {
  tooltip: { trigger: "item", triggerOn: "mousemove" },
  series: [
    {
      type: "sankey",
      draggable: true,
      layout: "none",
      data: nodes.map((node) => ({ name: node.name, itemStyle: node.itemStyle })),
      links: styledLinks,
      emphasis: { focus: "adjacency" },
      lineStyle: { curveness: 0.5 },
      nodeWidth: 30,
      nodeGap: 20,
      layoutIterations: 0,
      label: {
        show: true,
        formatter: (params) => params.name.split("_")[1], // Show only status name
      },
    },
  ],
};

// MouseUp event handler to log dragged node positions
const onChartReady = (chartInstance) => {
  chartInstance.on("mouseup", (params) => {
    if (params.componentType === "series" && params.seriesType === "sankey") {
      console.log(
        params.data
          ? `Node "${params.data.name}" moved to: x=${params.data.x}, y=${params.data.y}`
          : "Node moved"
      );
    }
  });
};

export const EchartsSankey3 = () => {
  return (
    <ChartWrapper title="Echarts">
       {({ width, height }) => (
      <ReactECharts option={options} onChartReady={onChartReady} style={{width, height}}/>
       )}
    </ChartWrapper>
  );
};
