import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useState } from "react";
import { ChartWrapper } from "../../common/chartWrapper";
import { LinearScale, PointElement, LineElement } from "chart.js";


Chart.register(LinearScale, PointElement, LineElement);


const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];


export const ChartjsTry = () => {
 const [chartData] = useState({
   datasets: [
     {
       label: "Target",
       data: [
         { x: 1, y: 3 },
         { x: 2, y: 3 }, // Decimal point added!         
         { x: 3, y: 3 },
         { x: 4, y: 3 },
         { x: 5, y: 4 },
         { x: 6, y: 4 },
         { x: 7, y: 4 },
         { x: 8, y: 4 },
         { x: 9, y: 4 },
         { x: 10, y: 4 },
         { x: 11, y: 4 },
         { x: 12, y: 4 },


       ],
       backgroundColor: "rgba(75,192,192,0.4)",
       borderColor: "rgba(75,192,192,1)",
       borderWidth: 1,
       pointRadius: 5, // Increase point size for visibility
       datalabels: {
           display: false,
         }, 
   },
     {
       label: "Actual",
       data: [
         { x: 1, y: 2 },
         { x: 2, y: 3 }, // Decimal point added!         
         { x: 3, y: 4 },
         { x: 4, y: 2 },
         { x: 5, y: 5 },
         { x: 6, y: 4 },
         { x: 7, y: 5 },
         { x: 8, y: 5 },
         { x: 9, y: 6 },
         { x: 10, y: 5 },
         { x: 11, y: 4 },
         { x: 12, y: 3 },


       ],
       backgroundColor: "rgba(75,192,192,0.4)",
       borderColor: "rgba(75,192,192,1)",
       borderWidth: 1,
       pointRadius: 5, // Increase point size for visibility
       datalabels: {
           display: false,
         },
   },
   ],
 });


 return (
   <ChartWrapper title="Chartjs">
     <Line
       data={chartData}
       options={{
         scales: {
           x: {
             type: "linear", // Use numerical x-axis
             position: "bottom",
             ticks: {
               callback: (value) => monthLabels[value - 1] || value, // Convert numbers to month labels
             },
           },
         },
         plugins: {
           title: {
             display: true,
             text: "KPI's 2024",
           },
         },
       }}
     />
   </ChartWrapper>
 );
};
