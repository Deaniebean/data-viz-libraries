import { useEffect, useRef } from "react";
import ApexSankey from "../../../lib/apexsankey";
import { ParetoData } from "../../../utils/DataPareto";
import { ChartWrapper } from "../../../common/chartWrapper";

export const ApexSankeyChart = () => {
  const chartRef = useRef(null);
  const initializedRef = useRef(false); // Prevent duplicate renders because of react strict mode

  useEffect(() => {
    if (!chartRef.current || initializedRef.current) return;
    initializedRef.current = true;


     const edges: { source: string; target: string; value: number; type: string }[] = [];
    
      // Map the data to the nodes and links
      // Map the data to the nodes and links
ParetoData.forEach((item) => {
  const history = item.history;
  for (let i = 0; i < history.length - 1; i++) {
    if (history[i] !== null && history[i + 1] !== null) {
      const source = `Sprint ${i + 1} ${getStatusName(history[i]!)}`;
      const target = `Sprint ${i + 2} ${getStatusName(history[i + 1]!)}`;
      const existingLink = edges.find(
        (edges) => edges.source === source && edges.target === target
      );
      if (existingLink) {
        existingLink.value += 1;
      } else {
        edges.push({ source, target, value: 1, type: "curved" });
      }
    }
  }
});

const data = {
  nodes: [
    { id: "Sprint 1 Backlog", title: "Sprint 1 Backlog", color: "#80808080" },
    { id: "Sprint 1 In Progress", title: "Sprint 1 In Progress", color: "#FFA50080" },
    { id: "Sprint 1 In Review", title: "Sprint 1 In Review", color: "#FF69B480" },
    { id: "Sprint 1 Done", title: "Sprint 1 Done", color: "#00800080" },
    { id: "Sprint 2 Backlog", title: "Sprint 2 Backlog", color: "#80808080" },
    { id: "Sprint 2 In Progress", title: "Sprint 2 In Progress", color: "#FFA50080" },
    { id: "Sprint 2 In Review", title: "Sprint 2 In Review", color: "#FF69B480" },
    { id: "Sprint 2 Done", title: "Sprint 2 Done", color: "#00800080" },
    { id: "Sprint 3 Backlog", title: "Sprint 3 Backlog", color: "#80808080" },
    { id: "Sprint 3 In Progress", title: "Sprint 3 In Progress", color: "#FFA50080" },
    { id: "Sprint 3 In Review", title: "Sprint 3 In Review", color: "#FF69B480" },
    { id: "Sprint 3 Done", title: "Sprint 3 Done", color: "#00800080" },
    { id: "Sprint 4 Backlog", title: "Sprint 4 Backlog", color: "#80808080" },
    { id: "Sprint 4 In Progress", title: "Sprint 4 In Progress", color: "#FFA50080" },
    { id: "Sprint 4 In Review", title: "Sprint 4 In Review", color: "#FF69B480" },
    { id: "Sprint 4 Done", title: "Sprint 4 Done", color: "#00800080" },
  ],
  edges: edges,
  options: {
    nodeWidth: 30,
    fontFamily: "Arial, sans-serif",
    fontWeight: 600,
    fontSize: "12px",
    fontColor: "#000",
    canvasStyle: "",
    spacing: 5,
    width: "100%",
    height: "100%",
    enableTooltip: true,
    tooltipId: "sankey-tooltip",
    tooltipBorderColor: "#ccc",
    tooltipBGColor: "#fff",
    edgeOpacity: 0.7,
    edgeGradientFill: true,
  },
};



    const sankey = new ApexSankey(chartRef.current, data.options);
    sankey.render(data);
  }, []);

  // Custom Legend Component
  const Legend = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>

      <div style={{ margin: '0 10px', display: 'flex', alignItems: 'center' }}>
        <span
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: "#808080", // Grey Backlog
            borderRadius: '50%',
            marginRight: '5px',
          }}
        />
        <span  style={{fontFamily: 'Arial, sans-serif'}}>Backlog</span>
      </div>

      <div style={{ margin: '0 10px', display: 'flex', alignItems: 'center' }}>
        <span
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: "#FFA500" , // Yellow in Progress
            borderRadius: '50%',
            marginRight: '5px',
          }}
        />
        <span  style={{fontFamily: 'Arial, sans-serif'}}>In Progress</span>
      </div>

      <div style={{ margin: '0 10px', display: 'flex', alignItems: 'center' }}>
        <span
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: "#FF69B4" , // Pink in Review
            borderRadius: '50%',
            marginRight: '5px',
          }}
        />
        <span  style={{fontFamily: 'Arial, sans-serif'}}>In Review</span>
      </div>

      <div style={{ margin: '0 10px', display: 'flex', alignItems: 'center' }}>
        <span
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: "#008000",
            borderRadius: '50%',
            marginRight: '5px',
          }}
        />
        <span style={{fontFamily: 'Arial, sans-serif'}}>Done</span>
      </div>
    </div>
  );

  return(
    <ChartWrapper title="ApexCharts">
       {({ width, height }) => (
         <>
           <div ref={chartRef} style={{ width, height }} />
           <Legend />
         </>
       )}
    </ChartWrapper>
  ) 
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