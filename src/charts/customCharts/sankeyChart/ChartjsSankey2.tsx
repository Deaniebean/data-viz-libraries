import SankeyChart from "react-sankey-chartjs"
import { Chart, LinearScale, CategoryScale } from 'chart.js';
import { SankeyController} from "chartjs-chart-sankey";

Chart.register(LinearScale, CategoryScale, SankeyController);
  
const colors: { [key: string]: string } = {
    A: "red",
    B: "green",
    C: "blue",
    D: "gray",
  };
  
  const getHover = (key: string): string => colors[key];
  const getColor = (key: string): string => colors[key];
  
  const data = {
    datasets: [
      {
        label: "Sankey Example",
        data: [
          { from: "A", to: "B", flow: 10 },
          { from: "A", to: "C", flow: 5 },
          { from: "B", to: "C", flow: 15 },
          { from: "D", to: "C", flow: 7 },
        ],
        colorFrom: (c: { dataset: { data: { from: string }[] }; dataIndex: number }) => getColor(c.dataset.data[c.dataIndex].from),
        colorTo: (c: { dataset: { data: { from: string; to: string }[] }; dataIndex: number }) => getColor(c.dataset.data[c.dataIndex].to),
        hoverColorFrom: (c: { dataset: { data: { from: string; to: string }[] }; dataIndex: number }) => getHover(c.dataset.data[c.dataIndex].from),
        hoverColorTo: (c: { dataset: { data: { from: string; to: string }[] }; dataIndex: number }) => getHover(c.dataset.data[c.dataIndex].to),
        colorMode: "gradient",
        alpha: 1,
        labels: {
          A: "Label A",
          B: "Label B",
          C: "Label C",
          D: "Label D",
        },
        priority: {
          B: 1,
          D: 0,
        },
        column: {
          D: 1,
        },
        size: "max",
      },
    ],
  };

export const ChartjsSankey2 = () => {


    return(
        <SankeyChart data={data} />
    )
}