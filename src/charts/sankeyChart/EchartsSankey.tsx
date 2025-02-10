import { ParetoData } from "../../utils/DataPareto";
import ReactECharts from 'echarts-for-react';

export const EchartsSankey = () => {
  
  const nodes = [
    { name: "Q1 Backlog", depth: 0, y: 0, fixed: true, itemStyle: { color: "#808080" } }, 
    { name: "Q1 In Progress", depth: 0, y: 1, fixed: true, itemStyle: { color: "#FFA500" } },
    { name: "Q1 In Review", depth: 0, y: 2, fixed: true, itemStyle: { color: "#FF69B4" } },
    { name: "Q1 Done", depth: 0, y: 3, fixed: true, itemStyle: { color: "#008000" } },
    
    { name: "Q2 Backlog", depth: 1, y: 0, fixed: true, itemStyle: { color: "#808080" } },
    { name: "Q2 In Progress", depth: 1, y: 1, fixed: true, itemStyle: { color: "#FFA500" } },
    { name: "Q2 In Review", depth: 1, y: 2, fixed: true, itemStyle: { color: "#FF69B4" } },
    { name: "Q2 Done", depth: 1, y: 3, fixed: true, itemStyle: { color: "#008000" } },
  
    { name: "Q3 Backlog", depth: 2, y: 0, fixed: true, itemStyle: { color: "#808080" } },
    { name: "Q3 In Progress", depth: 2, y: 1, fixed: true, itemStyle: { color: "#FFA500" } },
    { name: "Q3 In Review", depth: 2, y: 2, fixed: true, itemStyle: { color: "#FF69B4" } },
    { name: "Q3 Done", depth: 2, y: 3, fixed: true, itemStyle: { color: "#008000" } },
  
    { name: "Q4 Backlog", depth: 3, y: 0, fixed: true, itemStyle: { color: "#808080" } },
    { name: "Q4 In Progress", depth: 3, y: 1, fixed: true, itemStyle: { color: "#FFA500" } },
    { name: "Q4 In Review", depth: 3, y: 2, fixed: true, itemStyle: { color: "#FF69B4" } },
    { name: "Q4 Done", depth: 3, y: 3, fixed: true, itemStyle: { color: "#008000" } },
  ];

  
  const links: { source: string; target: string; value: number }[] = [];

  // Map the data to the nodes and links
  ParetoData.forEach((item) => {
    const history = item.history;
    for (let i = 0; i < history.length - 1; i++) {
      if (history[i] !== null && history[i + 1] !== null) {
        const source = `Q${i + 1} ${getStatusName(history[i]!)}`;
        const target = `Q${i + 2} ${getStatusName(history[i + 1]!)}`;
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
        data: nodes
          ,
        links: links,
        emphasis: {
          focus: "adjacency",
        },
        lineStyle: {
          color: "gradient",
          curveness: 0.5,
        },
        nodeWidth: 30, 
        nodeGap: 20, 
        layoutIterations: 0, 
      },
    ],
  };

  return (
    <div>
      <ReactECharts option={options} style={{ height: "600px", width: "1000px" }} />
    </div>
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