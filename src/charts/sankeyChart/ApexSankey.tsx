import React, { useEffect, useRef } from "react";
import ApexSankey from "apexsankey";

export const ApexSankeyChart = () => {
  const chartRef = useRef(null);
  const initializedRef = useRef(false); // Prevent duplicate renders becaus of react strict mode

  useEffect(() => {
    if (!chartRef.current || initializedRef.current) return;
    initializedRef.current = true; // Mark as initialized

    const data = {
      nodes: [
        { id: "Oil", title: "Oil" },
        { id: "Natural Gas", title: "Natural Gas" },
        { id: "Coal", title: "Coal" },
        { id: "Fossil Fuels", title: "Fossil Fuels" },
        { id: "Electricity", title: "Electricity" },
        { id: "Energy", title: "Energy" }
      ],
      edges: [
        { source: "Oil", target: "Fossil Fuels", value: 15, type: "direct" },
        { source: "Natural Gas", target: "Fossil Fuels", value: 20, type: "direct" },
        { source: "Coal", target: "Fossil Fuels", value: 25, type: "direct" },
        { source: "Coal", target: "Electricity", value: 25, type: "direct" },
        { source: "Fossil Fuels", target: "Energy", value: 60, type: "direct" },
        { source: "Electricity", target: "Energy", value: 25, type: "direct" }
      ],
      options : {
        nodeWidth: 20,
        fontFamily: "Arial, sans-serif",
        fontWeight: 600,
        fontSize: "12px",
        fontColor: "#000",
        height: 600,
        width: 800,
        canvasStyle: "",
        spacing: 10,
        viewPortWidth: 800,
        viewPortHeight: 600,
        nodeBorderWidth: 1,
        nodeBorderColor: "#000",
        enableTooltip: true,
        tooltipId: "sankey-tooltip",
        tooltipBorderColor: "#ccc",
        tooltipBGColor: "#fff",
        edgeOpacity: 0.7,
        edgeGradientFill: true
      },
    };

    const sankey = new ApexSankey(chartRef.current, data.options);
    sankey.render(data);
  }, []);

  return <div ref={chartRef} style={{ width: "800px", height: "600px", border: "1px solid #ccc" }} />;
};