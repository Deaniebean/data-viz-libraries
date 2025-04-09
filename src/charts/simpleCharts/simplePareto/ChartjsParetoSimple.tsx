import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Chart } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const ChartjsParetoSimple = () => {
    const data = {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          type: "bar",
          label: "Sales",
          data: [50, 75, 60, 90, 100],
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          type: "line",
          label: "Cumulative %",
          data: [10, 30, 50, 80, 100],
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderWidth: 2,
          tension: 0.4,
          yAxisID: "y1",
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Mixed Line and Bar Chart",
        },
      },
      scales: {
        y: {
          type: "linear",
          position: "left",
          title: {
            display: true,
            text: "Sales",
          },
        },
        y1: {
          type: "linear",
          position: "right",
          title: {
            display: true,
            text: "Cumulative %",
          },
          grid: {
         //   drawOnChartArea: false, 
          },
        },
      },
    };
  
    return (
      <div style={{ width: "600px", height: "400px" }}>
        <Chart type="bar" data={data} options={options} />
      </div>
    );
  };