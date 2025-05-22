# Evaluating Chart Libraries for Flexible and Adaptable Data Visualization
This repo contains the result of my thesis on the topic **Evaluating Chart Libraries for Flexible and Adaptable Data Visualization** 

In a preliminary round basic charts were created with numerous charting libraries to chose the most fitting candidates.

Next, the top picks Chart.js, ApexCharts and ECharts were further examined by implementing the three use cases of a Trend Line chart, Pareto chart and a Sankey chart. 
The charts were evaluated based on the criteria: ease of use (based on the implementation), responsiveness, community and support, integration flexibility and bundle size.

Replicate the results of the bundle size analyzer by running 
```console
npm run build
```
The script was configured to output the results of the bundle analyzer.

# Installation
To run this repo locally:
- clone the repo
- install the dependancies and run the app with:
 ```console
npm install
npm run dev
```

# Related Projects
New approach for measuring community and support:
https://github.com/Deaniebean/DevCareScore.js

A React wrapper created and used within this repo for the [chartjs-chart-sankey plugin ](https://www.npmjs.com/package/chartjs-chart-sankey):
https://github.com/Deaniebean/react-sankey-chartjs


