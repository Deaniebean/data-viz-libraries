import { ChartWrapper } from "../../../common/chartWrapper";
import { ParetoData } from "../../../utils/DataPareto";
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
       /* label: {
          show: true,
          formatter: function (params) {
            return params.name.split("_")[1]; 
          },     
        },*/
        label: {
          show:false,
        },
      },
    ],
    graphic: [
      {
        type: 'text',
        left: '5%',
        top: '95%',
        style: {
          text: 'Sprint 1',
          font: 'bold 14px Arial',
          fill: '#000',
        },
      },
      {
        type: 'text',
        left: '30%',
        top: '95%',
        style: {
          text: 'Sprint 2',
          font: 'bold 14px Arial',
          fill: '#000',
        },
      },
      {
        type: 'text',
        left: '53.5%',
        top: '95%',
        style: {
          text: 'Sprint 3',
          font: 'bold 14px Arial',
          fill: '#000',
        },
      },
      {
        type: 'text',
        left: '77%',
        top: '95%',
        style: {
          text: 'Sprint 4',
          font: 'bold 14px Arial',
          fill: '#000',
        },
      },
    ],
  };


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


  return (
      <ChartWrapper title="Echarts">
         {({ width, height }) => (
          <div style={{ width, height }}>
            <ReactECharts option={options}  />
            <Legend/>
          </div>
          )}        
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