import SankeyChart from "react-sankey-chartjs"
import { Chart, LinearScale, CategoryScale } from 'chart.js';
import { SankeyController} from "chartjs-chart-sankey";
import { ParetoData } from "../../utils/DataPareto";

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
      },
    ],
  };

export const ChartjsSankey = () => {


    return(
        <SankeyChart data={data} />
    )
}