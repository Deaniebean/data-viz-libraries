import { useEffect, useRef } from "react";
import ApexSankey from "apexsankey";
import { ParetoData } from "../../utils/DataPareto";
import { ChartWrapper } from "../../common/chartWrapper";

export const ApexSankeyChart = () => {
  const chartRef = useRef(null);
  const initializedRef = useRef(false); // Prevent duplicate renders because of react strict mode

  useEffect(() => {
    if (!chartRef.current || initializedRef.current) return;
    initializedRef.current = true;


     const edges: { source: string; target: string; value: number; type: string }[] = [];
    
      // Map the data to the nodes and links
      ParetoData.forEach((item) => {
        const history = item.history;
        for (let i = 0; i < history.length - 1; i++) {
          if (history[i] !== null && history[i + 1] !== null) {
            const source = `Q${i + 1} ${getStatusName(history[i]!)}`;
            const target = `Q${i + 2} ${getStatusName(history[i + 1]!)}`;
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
        { id: "Q1 Backlog", title: "Q1 Backlog", color: "#80808080" },
        { id: "Q1 In Progress", title: "In Progress", color: "#FFA50080" },
        { id: "Q1 In Review", title: "Q1 In Review", color: "#FF69B480" },
        { id: "Q1 Done", title: "Q1 Done", color: "#00800080"  },
       
        { id: "Q2 Backlog", title: "Q2 Backlog", color: "#80808080" },
        { id: "Q2 In Progress", title: "Q2 In Progress", color: "#FFA50080" },
        { id: "Q2 In Review", title: "Q2 In Review", color: "#FF69B480" },
        { id: "Q2 Done", title: "Q2 Done", color: "#00800080"  },

        { id: "Q3 Backlog", title: "Q3 Backlog", color: "#80808080" },
        { id: "Q3 In Progress", title: "Q3 In Progress", color: "#FFA50080" },
        { id: "Q3 In Review", title: "Q3 In Review", color: "#FF69B480" },
        { id: "Q3 Done", title: "Q3 Done", color: "#00800080"  },

        { id: "Q4 Backlog", title: "Q4 Backlog", color: "#80808080" },
        { id: "Q4 In Progress", title: "Q4 In Progress", color: "#FFA50080" },
        { id: "Q4 In Review", title: "Q4 In Review", color: "#FF69B480" },
        { id: "Q4 Done", title: "Q4 Done", color: "#00800080"  },
        
      ],
      edges: edges,
      options : {
        nodeWidth: 30,
        fontFamily: "Arial, sans-serif",
        fontWeight: 600,
        fontSize: "12px",
        fontColor: "#000",
        canvasStyle: "",
        spacing: 5,
        width: '100%',
        height: '#100%',
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

  return(
    <ChartWrapper title="ApexCharts">
      <div ref={chartRef}/>;
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