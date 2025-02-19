import { ChartWrapper } from "../../common/chartWrapper";
import { ParetoData } from "../../utils/DataPareto";
import ReactECharts from 'echarts-for-react';

export const EchartsSankey = () => {
  
  const nodes = [
    { name: "1_Backlog", displayName: "Backlog", depth: 0,fixed: true, itemStyle: { color: "#808080" } },
    { name: "1_In Progress", displayName: "In Progress", depth: 0, fixed: true, itemStyle: { color: "#FFA500" } },
    { name: "1_In Review", displayName: "In Review", depth: 0, fixed: true, itemStyle: { color: "#FF69B4" } },
    { name: "1_Done", displayName: "Done", depth: 0, fixed: true, itemStyle: { color: "#008000" } },
    
    { name: "2_Backlog", displayName: "Backlog", depth: 1, fixed: true, itemStyle: { color: "#808080" } },
    { name: "2_In Progress", displayName: "In Progress", depth: 1, fixed: true, itemStyle: { color: "#FFA500" } },
    { name: "2_In Review", displayName: "In Review", depth: 1, fixed: true, itemStyle: { color: "#FF69B4" } },
    { name: "2_Done", displayName: "Done", depth: 1, fixed: true, itemStyle: { color: "#008000" } },
  
    { name: "3_Backlog", displayName: "Backlog", depth: 2, fixed: true, itemStyle: { color: "#808080" } },
    { name: "3_In Progress", displayName: "In Progress", depth: 2, fixed: true, itemStyle: { color: "#FFA500" } },
    { name: "3_In Review", displayName: "In Review", depth: 2, fixed: true, itemStyle: { color: "#FF69B4" } },
    { name: "3_Done", displayName: "Done", depth: 2, fixed: true, itemStyle: { color: "#008000" } },
  
    { name: "4_Backlog", displayName: "Backlog", depth: 3, fixed: true, itemStyle: { color: "#808080" } },
    { name: "4_In Progress", displayName: "In Progress", depth: 3, fixed: true, itemStyle: { color: "#FFA500" } },
    { name: "4_In Review", displayName: "In Review", depth: 3, fixed: true, itemStyle: { color: "#FF69B4" } },
    { name: "4_Done", displayName: "Done", depth: 3, fixed: true, itemStyle: { color: "#008000" } },
  ];
  
  const links: { source: string; target: string; value: number }[] = [];

  // Map the data to the nodes and links
  ParetoData.forEach((item) => {
    const history = item.history;
    for (let i = 0; i < history.length - 1; i++) {
      if (history[i] !== null && history[i + 1] !== null) {
        const source = `${i + 1}_${getStatusName(history[i]!)}`;
        const target = `${i + 2}_${getStatusName(history[i + 1]!)}`;
        const existingLink = links.find(
          (link) => link.source === source && link.target === target
        );
        if (existingLink) {
          existingLink.value += 1;
        } else {
          links.push({ source, target, value: 1 });
        }
      }
    }
  });

  const options = {
    title: {
      text: "Sankey Diagram",
    },
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
    },
    series: [
      {
        type: "sankey",
        layout: "none",
        data: nodes,
        links: links,
        emphasis: { focus: "adjacency" },
        lineStyle: { color: "gradient", curveness: 0.5 },
        nodeWidth: 30,
        nodeGap: 20,
        layoutIterations: 0,
        nodeAlign: "justify",
        label: {
          show: true,
          formatter: function (params) {
            return params.name.split("_")[1]; // Show only the status name
          },
        },
      },
    ],
    graphic: [
      {
        type: 'text',
        left: '5%',
        top: '95%',
        style: {
          text: 'Q1',
          font: 'bold 14px Arial',
          fill: '#000',
        },
      },
      {
        type: 'text',
        left: '30%',
        top: '95%',
        style: {
          text: 'Q2',
          font: 'bold 14px Arial',
          fill: '#000',
        },
      },
      {
        type: 'text',
        left: '53.5%',
        top: '95%',
        style: {
          text: 'Q3',
          font: 'bold 14px Arial',
          fill: '#000',
        },
      },
      {
        type: 'text',
        left: '78%',
        top: '95%',
        style: {
          text: 'Q4',
          font: 'bold 14px Arial',
          fill: '#000',
        },
      },
    ],
  };

  return (
      <ChartWrapper title="Echarts">
        <ReactECharts option={options}  />
      </ChartWrapper>
  );
};

const getStatusName = (status: number) => {
  switch (status) {
    case 1:
      return "Backlog";
    case 2:
      return "In Progress";
    case 3:
      return "In Review";
    case 4:
      return "Done";
    default:
      return "";
  }
};