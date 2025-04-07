import Chart from "react-apexcharts";
import { useState, useEffect, useRef } from "react";
import { ChartWrapper } from "../../common/chartWrapper";
import dataJson from "../../utils/DataLineChart.json"; 
import { formatMonths } from "../../utils/Months"; 

interface DataPoint {
  id: number;
  target: number;
  actual: number;
}

const calculateIntersections = (data: DataPoint[]) => {
  const targetData = data.map(d => ({ x: d.id, y: d.target }));
  const actualData = data.map(d => ({ x: d.id, y: d.actual }));

  for (let i = 0; i < data.length - 1; i++) {
    const curr = data[i];
    const next = data[i + 1];

    // Check if there's an intersection between current and next points
    if ((curr.actual < curr.target && next.actual > next.target) ||
        (curr.actual > curr.target && next.actual < next.target)) {

      // Estimate intersection using linear interpolation
      const xIntersect = curr.id +
        Math.abs((curr.target - curr.actual) / ((next.actual - curr.actual) - (next.target - curr.target)));
      const yIntersect = curr.target + ((next.target - curr.target) * (xIntersect - curr.id));

      actualData.push({ x: xIntersect, y: yIntersect });
    }
  }

  // Sort actualData by x value to maintain correct order
  actualData.sort((a, b) => a.x - b.x);

  return { targetData, actualData };
};

export const ApexChartsCustom2 = () => {
  const [chartData, setChartData] = useState<{ targetData: { x: number; y: number }[]; actualData: { x: number; y: number }[] }>({ targetData: [], actualData: [] });
  const [coloredData, setColoredData] = useState<{ x: number; y: number; color: string }[]>([]);
  const [containerDimensions, setContainerDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const chartContainerRef = useRef<HTMLDivElement | null>(null); // Ref for the container

  useEffect(() => {
    const { targetData, actualData } = calculateIntersections(dataJson as DataPoint[]);
    setChartData({ targetData, actualData });

    // Log the chart data after it has been set
    console.log("Chart Data", { targetData, actualData });

    const colored = actualData.map((point) => {
      // Find the target values surrounding the current point
      const targetCurr = targetData.find((t) => t.x === point.x);
      let targetNext = targetData.find((t) => t.x > point.x);
      if (!targetNext) targetNext = targetData[targetData.length - 1];

      // Interpolate target value if necessary (in case the x is not an exact match)
      const interpolatedTargetY = targetCurr
        ? targetCurr.y + (targetNext.y - targetCurr.y) * (point.x - targetCurr.x) / (targetNext.x - targetCurr.x)
        : targetNext.y; // Fallback to targetNext.y if targetCurr is undefined

      // Determine the color based on whether the actual value is above or below the target
      const color = point.y >= interpolatedTargetY ? "#14b425" : "#ff0000"; 

      return {
        x: point.x,
        y: point.y,
        color: color,
      };
    });

    setColoredData(colored); // Update the coloredData state
  }, [dataJson]); // Add dataJson as a dependency to re-run if it changes

  const colorStops = coloredData.map((dataPoint, index) => {
    const nextDataPoint = coloredData[index + 1];
    if (!nextDataPoint) return null;

    // Get the range of x values in the data
    const firstPointX = coloredData[0].x;
    const lastPointX = coloredData[coloredData.length - 1].x;

    // Calculate offset based on the current x and last x values
    const offset = ((dataPoint.x - firstPointX) / (lastPointX - firstPointX)) * 100.0;
    const nextOffset = ((nextDataPoint.x - firstPointX) / (lastPointX - firstPointX)) * 100.0;

    // Determine the segment color based on the comparison with target data
    const y0_actual = dataPoint.y;
    const y1_actual = nextDataPoint.y;
    const y0_target = chartData.targetData.find((d) => d.x === dataPoint.x)?.y ?? 0;
    const y1_target = chartData.targetData.find((d) => d.x === nextDataPoint.x)?.y ?? 0;

    const sectionColor = y0_actual >= y0_target && y1_actual >= y1_target
      ? "#14b425" 
      : "#ff0000"; 

    return {
      offset: offset,
      nextOffset: nextOffset,
      color: sectionColor,
      nextColor: sectionColor,
    };
  }).filter(stop => stop !== null);

  const chartOptions = {
    series: [
      {
        name: "Actual",
        data: coloredData.map((data) => ({
          x: data.x,
          y: data.y,
          fillColor: data.color
        })),
      },
      {
        name: "Target",
        data: chartData.targetData,
        type: "line",
      },
      {
        name: "Actual",
        data: [],
        type: "line",
        stroke: {
          width: 0,
        },
        legendLabels: {
          show: true,
          name: "Actual",
        },
      },
    ],
    chart: { 
      type: "line" as const, 
      height: "100%",
      width: "100%", 
    },
    xaxis: {
      type: "numeric" as const,
      title: { text: "Months" },
      tickAmount: dataJson.length-1, 
      labels: {
        formatter: (value: string) => {
          const numericValue = parseFloat(value);
          const allMonths: string[] = formatMonths(dataJson.map((data) => data.month));
          return allMonths[Math.round(numericValue) - 1] || value;
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
      },
      title: { text: "Values" },
      min: 0, 
      labels: {
        formatter: (value: number) => Math.round(value).toString(), 
      },
    },
    fill: {
      type: ["gradient", "solid"],
      colors: ["#000000"],
      gradient: {
        type: "horizontal",
        colorStops: colorStops.flatMap((stop) => [
          { offset: stop.offset, color: stop.color, opacity: 1 },
          { offset: stop.nextOffset, color: stop.nextColor, opacity: 1 },
        ]),
      },
    },
    stroke: {
      curve: ["straight" as const, "straight" as const],
      dashArray: [0, 5],
    },
    markers: {
      size: [0, 0],
      discrete: coloredData
        .map((point, index) => ({
          seriesIndex: 0, 
          dataPointIndex: index,
          size: Number.isInteger(point.x) ? 5 : 0,
        })) .filter((d) => d.size > 0), 
    },
    tooltip: {
      x: { format: "MMM" },
    },
    legend: {
      show: true,
      markers: {
        fillColors: ["#14b425", "#000000", "#ff0000"],
      },
    },
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (chartContainerRef.current) {
        setContainerDimensions({
          width: chartContainerRef.current.offsetWidth,
          height: chartContainerRef.current.offsetHeight,
        });
      }
    });

    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    return () => {
      if (chartContainerRef.current) {
        resizeObserver.unobserve(chartContainerRef.current);
      }
    };
  }, []); // Run only once on mount

  return (
    <ChartWrapper title="ApexCharts">
      {() => (
        <div ref={chartContainerRef} style={{ width: "100%", height: "100%" }}>
          <Chart
            options={chartOptions}
            series={chartOptions.series}
            type="line"
            width={containerDimensions.width} 
            height={containerDimensions.height} 
          />
        </div>
      )}
    </ChartWrapper>
  );
};
