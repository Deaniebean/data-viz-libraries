import { ChartWrapper } from "../../common/chartWrapper";
import { ParetoData } from "../../utils/DataPareto";
import ReactECharts from "echarts-for-react";

export const EchartsSankey3 = () => {
  // Define colors for groups (A-Class, B-Class, etc.)
  const groupColors: Record<string, string> = {
    "A-Class": "#FF0000", // Red
    "B-Class": "#FF0000", // Blue
    "C-Class": "#0000FF", // Green
    "D-Class": "#0000FF", // Magenta
  };

  // Extract dynamic nodes
  const nodes: { name: string; itemStyle?: { color: string } }[] = [];
  const nodeSet = new Set<string>();

  // Store links grouped by (source, target, group) separately
  const linkMap = new Map<string, { source: string; target: string; value: number; lineStyle: { color: string } }>();

  ParetoData.forEach((item) => {
    const history = item.history;
    for (let i = 0; i < history.length - 1; i++) {
      if (history[i] !== null && history[i + 1] !== null) {
        const source = `Q${i + 1} ${getStatusName(history[i]!)}`;
        const target = `Q${i + 2} ${getStatusName(history[i + 1]!)}`;
        const group = item.group; // Get the group from ParetoData
        const linkKey = `${source}->${target}->${group}`; // Unique key for each (source, target, group)

        // Add nodes dynamically if not present
        if (!nodeSet.has(source)) {
          nodeSet.add(source);
          nodes.push({ name: source, itemStyle: { color: groupColors[group] || "#CCCCCC" } });
        }
        if (!nodeSet.has(target)) {
          nodeSet.add(target);
          nodes.push({ name: target, itemStyle: { color: groupColors[group] || "#CCCCCC" } });
        }

        // Track links separately for each group
        if (linkMap.has(linkKey)) {
          linkMap.get(linkKey)!.value += 1;
        } else {
          linkMap.set(linkKey, {
            source,
            target,
            value: 1,
            lineStyle: { color: groupColors[group] || "#CCCCCC" }, // Set color per group
          });
        }
      }
    }
  });

  // Convert linkMap to array
  const links = Array.from(linkMap.values());
  console.log(Array.from(linkMap.values()));

  const options = {
    title: { text: "Sankey Diagram" },
    tooltip: { trigger: "item", triggerOn: "mousemove" },
    series: [
      {
        type: "sankey",
        layout: "none",
        data: nodes,
        links: links,
        emphasis: { focus: "adjacency" },
        lineStyle: { curveness: 0.5 },
        nodeWidth: 30,
        nodeGap: 20,
      },
    ],
  };

  return (
    <ChartWrapper title="Echarts">
      <ReactECharts option={options} />
    </ChartWrapper>
  );
};

// Helper function to get status names
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
