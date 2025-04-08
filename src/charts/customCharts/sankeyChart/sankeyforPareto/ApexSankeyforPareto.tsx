import { useEffect, useRef } from "react";
import ApexSankey from "apexsankey";
import { ChartWrapper } from "../../../../common/chartWrapper";

export const ApexSankeyChart = () => {
  const chartRef = useRef(null);
  const initializedRef = useRef(false); // Prevent duplicate renders because of react strict mode

  useEffect(() => {
    if (!chartRef.current || initializedRef.current) return;
    initializedRef.current = true;

    const edges = [
            { source: "2_Backlog", target: "3_Backlog", value: 1, type: "curved", /*group: "B-Class"*/ },
            { source: "3_Backlog", target: "4_Backlog", value: 14, type: "curved" /*group: "B-Class"*/ },
            { source: "2_Backlog", target: "3_In Progress", value: 25, type: "curved"/*group: "A-Class"*/ },
            { source: "3_In Progress", target: "4_In Progress", value: 21, type: "curved" /*group: "A-Class"*/  },
            { source: "1_Backlog", target: "2_In Progress", value: 28, type: "curved"/*group: C-Class"*/  },
            { source: "1_Backlog", target: "2_Backlog", value: 8, type: "curved"/*group: "B-Class"*/ },
            { source: "1_Backlog", target: "2_Backlog", value: 3, type: "curved"/*group: "A-Class"*/  },
            { source: "2_In Progress", target: "3_In Review", value: 25, type: "curved"/*group: C-Class"*/ },
            { source: "3_In Review", target: "4_Done", value: 12, type: "curved"/*group: C-Class"*/},
            { source: "1_Done", target: "2_Done", value: 12, type: "curved"/*group: D-Class"*/},
            { source: "2_Done", target: "3_Done", value: 13, type: "curved"/*group: D-Class"*/ },
            { source: "3_Done", target: "4_Done", value: 13, type: "curved"/*group: D-Class"*/},
            { source: "2_In Progress", target: "3_In Progress", value: 3, type: "curved"/*group: C-Class"*/ },
            { source: "3_In Progress", target: "4_Done", value: 2, type: "curved"/*group: C-Class"*/ },
            { source: "1_In Review", target: "2_Done", value: 1, type: "curved" /*group: D-Class"*/ },
            { source: "1_Backlog", target: "2_In Progress", value: 1, type: "curved" /*group: D-Class"*/ },
            { source: "2_In Progress", target: "3_In Review", value: 1, type: "curved"/*group: D-Class"*/ },
            { source: "3_In Review", target: "4_Done", value: 1, type: "curved" /*group: D-Class"*/ },
            { source: "3_In Review", target: "4_In Review", value: 13, type: "curved"/*group: C-Class"*/ },
            { source: "1_In Progress", target: "2_In Review", value: 1, type: "curved"/*group: D-Class"*/ },
            { source: "2_In Review", target: "3_In Review", value: 1, type: "curved"/*group: D-Class"*/ },
            { source: "3_In Review", target: "4_In Review", value: 1, type: "curved"/*group: D-Class"*/ },
            { source: "2_Backlog", target: "3_Backlog", value: 1, type: "curved"/*group: "A-Class"*/  },
            { source: "3_Backlog", target: "4_Backlog", value: 13, type: "curved"/*group: "A-Class"*/  },
            { source: "2_Backlog", target: "3_In Progress", value: 13, type: "curved"/*group: "B-Class"*/ },
            { source: "3_In Progress", target: "4_In Progress", value: 12, type: "curved"/*group: "B-Class"*/ },
            { source: "3_In Progress", target: "4_In Review", value: 1, type: "curved"/*group: C-Class"*/ },
            { source: "3_In Progress", target: "4_Done", value: 1, type: "curved"/*group: "B-Class"*/ },
            { source: "1_Backlog", target: "2_Backlog", value: 1, type: "curved"/*group: D-Class"*/ },
            { source: "2_Backlog", target: "3_In Progress", value: 1,  type: "curved"/*group: D-Class"*/ },
            { source: "3_In Progress", target: "4_In Review", value: 1, type: "curved" /*group: D-Class"*/ },
            { source: "3_In Progress", target: "4_In Review", value: 4, type: "curved"/*group: "A-Class"*/  },
        ];


    const nodes = [
        { id: "Q1 Backlog", title: "Q1 Backlog", color: "#80808080" },
        { id: "Q1 In Progress", title: "In Progresss", color: "#FFA50080" },
        { id: "Q1 In Review", title: "Q1 In Review", color: "#FF69B480" },
        { id: "Q1 Done", title: "Q1 Done", color: "#00800080"  },
       
        { id: "Q2 Backlog", title: "Q2 Backlog", color: "#80808080" },
        { id: "Q2 In Progress", title: "Q2 In Progresss", color: "#FFA50080" },
        { id: "Q2 In Review", title: "Q2 In Review", color: "#FF69B480" },
        { id: "Q2 Done", title: "Q2 Done", color: "#00800080"  },

        { id: "Q3 Backlog", title: "Q3 Backlog", color: "#80808080" },
        { id: "Q3 In Progress", title: "Q3 In Progresss", color: "#FFA50080" },
        { id: "Q3 In Review", title: "Q3 In Review", color: "#FF69B480" },
        { id: "Q3 Done", title: "Q3 Done", color: "#00800080"  },

        { id: "Q4 Backlog", title: "Q3 Backlog", color: "#80808080" },
        { id: "Q4 In Progress", title: "Q3In Progresss", color: "#FFA50080" },
        { id: "Q4 In Review", title: "Q3 In Review", color: "#FF69B480" },
        { id: "Q4 Done", title: "Q3 Done", color: "#00800080"  },
        
      ],
 

    const data = {


    
        nodes: nodes,
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