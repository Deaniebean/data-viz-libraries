import ReactECharts from "echarts-for-react";
import { ParetoData } from "../../utils/DataPareto";

interface SankeyNode {
  name: string;
  depth?: number;
  y?: number;
  itemStyle?: {
    color: string;
  };
}

export const EchartsSankey2 = () => {
  // Prepare the data for the Sankey chart
  const groups = Array.from(new Set(ParetoData.map((data) => data.group)));
  console.log("Groups:", groups);

  const statuses = ["Backlog", "In Progress", "In Review"];
  console.log("Statuses:", statuses);

  const links: { source: string; target: string; value: number }[] = [];
  const nodes: SankeyNode[] = [];

  // Add group nodes
  groups.forEach((group, index) => {
    nodes.push({ name: group, depth: 0, y: index * 100, itemStyle: { color: "#808080" } });
  });
  console.log("Group Nodes:", nodes);

  // Add status nodes
  statuses.forEach((status, index) => {
    let color = "";
    switch (status) {
      case "Backlog":
        color = "#808080";
        break;
      case "In Progress":
        color = "#FFA500";
        break;
      case "In Review":
        color = "#FF69B4";
        break;
      case "Done":
        color = "#008000";
        break;
    }
    nodes.push({ name: status, depth: 1, y: index * 100, itemStyle: { color } });
  });
  console.log("Status Nodes:", nodes);

  // Create links from groups to statuses
  groups.forEach((group) => {
    const unfinishedTickets = ParetoData.filter(
      (data) => data.group === group && data.status !== 4
    );
    console.log(`Unfinished Tickets for ${group}:`, unfinishedTickets);

    const totalUnfinished = unfinishedTickets.length;
    console.log(`Total Unfinished Tickets for ${group}:`, totalUnfinished);

    if (totalUnfinished > 0) {
      statuses.forEach((status, index) => {
        const count = unfinishedTickets.filter(
          (data) => data.status === index + 1
        ).length;
        console.log(`Count of ${status} for ${group}:`, count);

        if (count > 0) {
          links.push({
            source: group,
            target: status,
            value: count,
          });
        }
      });
    }
  });
  console.log("Links:", links);

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
        emphasis: {
          focus: "adjacency",
        },
        lineStyle: {
          color: "gradient",
          curveness: 0.5,
        },
        nodeWidth: 30,
        nodeGap: 20,
        layoutIterations: 32,
      },
    ],
  };

  return (
    <div>
      <ReactECharts option={options} style={{ height: "600px", width: "1000px" }} />
    </div>
  );
};