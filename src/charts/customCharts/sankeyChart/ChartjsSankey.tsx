import SankeyChart from "react-sankey-chartjs"
import { Chart, LinearScale, CategoryScale } from 'chart.js';
import { SankeyController} from "chartjs-chart-sankey";
import { ParetoData } from "../../../utils/DataPareto";
import { ChartWrapper } from "../../../common/chartWrapper";

Chart.register(LinearScale, CategoryScale, SankeyController);

const links: { from: string; to: string; flow: number; }[] = [];
  
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

  const colors = {
    "Backlog": "#80808050",
    "In Progress": "#FFA50050",
    "In Review": "#FF69B450" ,
    "Done": "#00800050",
  };
  
  const getHover = (key: keyof typeof colors) => colors[key];
  const getColor = (key: keyof typeof colors) => colors[key];

  const extractStatus = (label: string) => {
    const parts = label.split(" ");
    return parts.slice(1).join(" "); // Join everything after the first element
};
  
// Map the data to the nodes and links
ParetoData.forEach((item) => {
    const history = item.history;
    for (let i = 0; i < history.length - 1; i++) {
      if (history[i] !== null && history[i + 1] !== null) {
        const source = `Q${i + 1} ${getStatusName(history[i]!)}`;
        const target = `Q${i + 2} ${getStatusName(history[i + 1]!)}`;
        const existingLink = links.find(
          (link) => link.from === source && link.to === target
        );
        if (existingLink) {
          existingLink.flow += 1;
        } else {
          links.push({ from: source, to: target, flow: 1 });
        }
      }
    }
  });
  


const data = {
    datasets: [
      {
        label: "Sankey Example",
        data: links,
        datalabels: {
          display: false, 
        },
        colorFrom: (c: { dataset: { data: { [x: string]: { from: string; }; }; }; dataIndex: string | number; })  => {
            const fromStatus = extractStatus(c.dataset.data[c.dataIndex].from);
            console.log("Extracted fromStatus:", fromStatus);
            return getColor(fromStatus as keyof typeof colors);
        },
        
        colorTo: (c: { dataset: { data: { [x: string]: { to: string; }; }; }; dataIndex: string | number; }) => {
            const toStatus = extractStatus(c.dataset.data[c.dataIndex].to);
            console.log("Extracted toStatus:", toStatus);
            return getColor(toStatus as keyof typeof colors);
        },
        
        hoverColorFrom: (c: { dataset: { data: { [x: string]: { from: string; }; }; }; dataIndex: string | number; }) => {
            console.log("Extracted hover from:", c.dataset.data[c.dataIndex].from);
            const fromStatus = c.dataset.data[c.dataIndex].from.split(" ")[1];
            console.log("Extracted hover fromStatus:", fromStatus);
            return getHover(fromStatus as keyof typeof colors);
        },
        hoverColorTo: (c: { dataset: { data: { [x: string]: { to: string; }; }; }; dataIndex: string | number; }) => {
            console.log("Extracted hover to:", c.dataset.data[c.dataIndex].to);
            const toStatus = c.dataset.data[c.dataIndex].to.split(" ")[1];
            console.log("Extracted hover toStatus:", toStatus);
            return getHover(toStatus as keyof typeof colors);
        },
          colorMode: "gradient",
          priority: {
            "Q1 Backlog": 0,
            "Q1 In Progress": 1,
            "Q1 In Review": 2,
            "Q1 Done": 3,
            "Q2 Backlog": 0,
            "Q2 In Progress": 1,
            "Q2 In Review": 2,
            "Q2 Done": 3,
            "Q3 Backlog": 0,
            "Q3 In Progress": 1,
            "Q3 In Review": 2,
            "Q3 Done": 3,
            "Q4 Backlog": 0,
            "Q4 In Progress": 1,
            "Q4 In Review": 2,
            "Q4 Done": 3,
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
 export const ChartjsSankey = () => {


    return(
        <ChartWrapper title="chartjs">
           {({ width, height }) => (
          <div style={{ width, height }}>
            <SankeyChart data={data} />
         
          <Legend/> 
          </div>
           )}
        </ChartWrapper>
    )
}