import ReactECharts from "echarts-for-react";
import { ChartWrapper } from "../../common/chartWrapper";

// Define colors for groups
const groupColors: Record<string, string | null> = {
  "A-Class": null, // Dynamic gradient
  "B-Class": null, // Dynamic gradient
  "C-Class": "#808080", // Grey
  "D-Class": "#808080", // Magenta
};

// Define colors for statuses
const statusColors: Record<string, string> = {
  "Backlog": "#808080", // Gray
  "In Progress": "#FFA500", // Orange
  "In Review": "#FF69B4", // Pink
  "Done": "#008000", // Green
};

// Define nodes
const nodes = [
  { name: "1_Backlog", itemStyle: { color: statusColors["Backlog"] } },
  { name: "1_In Progress", itemStyle: { color: statusColors["In Progress"] } },
  { name: "1_In Review", itemStyle: { color: statusColors["In Review"] } },
  { name: "1_Done", itemStyle: { color: statusColors["Done"] } },
  { name: "2_Backlog", itemStyle: { color: statusColors["Backlog"] } },
  { name: "2_In Progress", itemStyle: { color: statusColors["In Progress"] } },
  { name: "2_In Review", itemStyle: { color: statusColors["In Review"] } },
  { name: "2_Done", itemStyle: { color: statusColors["Done"] } },
  { name: "3_Backlog", itemStyle: { color: statusColors["Backlog"] } },
  { name: "3_In Progress", itemStyle: { color: statusColors["In Progress"] } },
  { name: "3_In Review", itemStyle: { color: statusColors["In Review"] } },
  { name: "3_Done", itemStyle: { color: statusColors["Done"] } },
  { name: "4_Backlog", itemStyle: { color: statusColors["Backlog"] } },
  { name: "4_In Progress", itemStyle: { color: statusColors["In Progress"] } },
  { name: "4_In Review", itemStyle: { color: statusColors["In Review"] } },
  { name: "4_Done", itemStyle: { color: statusColors["Done"] } },
];

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
];

// Helper function to get a node's color
const getNodeColor = (nodeName: string) => {
  const node = nodes.find(n => n.name === nodeName);
  return node ? node.itemStyle.color : "#CCCCCC"; // Default gray if not found
};

// Apply colors to links
const styledLinks = links.map(link => {
  const sourceColor = getNodeColor(link.source);
  const targetColor = getNodeColor(link.target);
  
  const linkColor = groupColors[link.group] 
    ? groupColors[link.group] // Use fixed color if group has one
    : { type: "linear", x: 0, y: 0, x2: 1, y2: 0, colorStops: [
        { offset: 0, color: sourceColor },
        { offset: 1, color: targetColor }
      ]};

  return {
    ...link,
    lineStyle: { color: linkColor, opacity: 0.8 },
  };
});

const options = {
  title: { text: "ECharts Sankey Diagram" },
  tooltip: { trigger: "item", triggerOn: "mousemove" },
  series: [
    {
      type: "sankey",
      layout: "none",
      data: nodes.map(node => ({ name: node.name, itemStyle: node.itemStyle })),
      links: styledLinks,
      emphasis: { focus: "adjacency" },
      lineStyle: { curveness: 0.5 },
      nodeWidth: 30,
      nodeGap: 20,
    },
  ],
};

export const EchartsSankeyTest = () => {
  return (
    <ChartWrapper title="Echarts">
      <ReactECharts option={options} />
    </ChartWrapper>
  );
};
