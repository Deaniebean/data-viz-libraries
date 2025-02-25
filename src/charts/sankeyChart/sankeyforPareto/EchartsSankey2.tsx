import ReactECharts from "echarts-for-react";
import { ChartWrapper } from "../../../common/chartWrapper";

// Define colors for groups
const groupColors: Record<string, string> = {
  "A-Class": "#FF0000", // Red
  "B-Class": "#FF0000", // Blue
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
  { name: "1_Backlog", displayName: "Backlog", depth: 0, fixed: true, itemStyle: { color: statusColors["Backlog"] } },
  { name: "1_In Progress", displayName: "In Progress", depth: 0, fixed: true, itemStyle: { color: statusColors["In Progress"] } },
  { name: "1_In Review", displayName: "In Review", depth: 0, fixed: true, itemStyle: { color: statusColors["In Review"] } },
  { name: "1_Done", displayName: "Done", depth: 0, fixed: true, itemStyle: { color: statusColors["Done"] } },

  { name: "2_Backlog", displayName: "Backlog", depth: 1, fixed: true, itemStyle: { color: statusColors["Backlog"] } },
  { name: "2_In Progress", displayName: "In Progress", depth: 1, fixed: true, itemStyle: { color: statusColors["In Progress"] } },
  { name: "2_In Review", displayName: "In Review", depth: 1, fixed: true, itemStyle: { color: statusColors["In Review"] } },
  { name: "2_Done", displayName: "Done", depth: 1, fixed: true, itemStyle: { color: statusColors["Done"] } },

  { name: "3_Backlog", displayName: "Backlog", depth: 2, fixed: true, itemStyle: { color: statusColors["Backlog"] } },
  { name: "3_In Progress", displayName: "In Progress", depth: 2, fixed: true, itemStyle: { color: statusColors["In Progress"] } },
  { name: "3_In Review", displayName: "In Review", depth: 2, fixed: true, itemStyle: { color: statusColors["In Review"] } },
  { name: "3_Done", displayName: "Done", depth: 2, fixed: true, itemStyle: { color: statusColors["Done"] } },

  { name: "4_Backlog", displayName: "Backlog", depth: 3, fixed: true, itemStyle: { color: statusColors["Backlog"] } },
  { name: "4_In Progress", displayName: "In Progress", depth: 3, fixed: true, itemStyle: { color: statusColors["In Progress"] } },
  { name: "4_In Review", displayName: "In Review", depth: 3, fixed: true, itemStyle: { color: statusColors["In Review"] } },
  { name: "4_Done", displayName: "Done", depth: 3, fixed: true, itemStyle: { color: statusColors["Done"] } },
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

//9 stück in D-Classe [0, 0, 1, 1] hinzugefügt


// Apply colors to links
const styledLinks = links.map((link) => ({
  ...link,
  lineStyle: { color: groupColors[link.group] || "#CCCCCC" },
}));

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
        formatter: function (params) {
          return params.name.split("_")[1]; // Show only the status name
        },
      },
    },
  ],
};

// MouseUp event handler to log dragged node positions
const onChartReady = (chartInstance: echarts.ECharts) => {
  chartInstance.on("mouseup", function (params) {
    if (params.componentType === "series" && params.seriesType === "sankey") {
      console.log(
        params.data ? `Node "${params.data.name}" moved to: x=${params.data.x}, y=${params.data.y}` : 'Node moved'
      );
    }
  });
};


  // Custom Legend Component with grouped classes
  const Legend = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      {/* Group A-Class and B-Class */}
      <div style={{ margin: '0 10px', display: 'flex', alignItems: 'center' }}>
        <span
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: "rgba(255, 0, 0, 0.3)", // Red for A-Class
            borderRadius: '50%',
            marginRight: '5px',
          }}
        />
        <span>A-Class & B-Class</span>
      </div>

      {/* Group C-Class and D-Class */}
      <div style={{ margin: '0 10px', display: 'flex', alignItems: 'center' }}>
        <span
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: "rgba(128, 128, 128, 0.3)", // Grey for C-Class
            borderRadius: '50%',
            marginRight: '5px',
          }}
        />
        <span>C-Class & D-Class</span>
      </div>
    </div>
  );


export const EchartsSankey2 = () => {
  return (
    <ChartWrapper title="Echarts">
      <ReactECharts option={options} onChartReady={onChartReady} />
      <Legend/>
    </ChartWrapper>
  );
};