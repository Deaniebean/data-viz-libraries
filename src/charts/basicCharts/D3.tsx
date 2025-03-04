import { useRef, useEffect, useState } from "react";
import {
  select,
  line,
  curveCardinal,
  scaleLinear,
  scaleBand,
  axisBottom,
  axisLeft,
} from "d3";
import { Data } from "../../utils/DataLineChart";


// Chart component
export const D3 = () => {
  // Refs
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [chartData] = useState(Data);

  // Draws chart
  useEffect(() => {
    const svg = select(svgRef.current)
      .attr("width", 500) // Set width
      .attr("height", 300); // Set height

    // Scales
    const xScale = scaleBand()
      .domain(chartData.map((d) => d.month))
      .range([0, 400])
      .padding(0.1);

    const yScale = scaleLinear().domain([0, 10]).range([200, 0]);

    // Axes
    const xAxis = axisBottom(xScale);
    svg.select<SVGGElement>(".x-axis")
      .attr("transform", "translate(50, 250)") // Adjust position
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select<SVGGElement>(".y-axis")
      .attr("transform", "translate(50, 50)") // Adjust position
      .call(yAxis);

    // Line generator for actual
    const actualLine = line<{ month: string; actual: number }>()
      .x((d) => xScale(d.month)!)
      .y((d) => yScale(d.actual))
      .curve(curveCardinal);

    // Line generator for target
    const targetLine = line<{ month: string; target: number }>()
      .x((d) => xScale(d.month)!)
      .y((d) => yScale(d.target))
      .curve(curveCardinal);

    // Drawing the actual line
    svg
      .selectAll(".line-actual")
      .data([chartData])
      .join("path")
      .attr("class", "line-actual")
      .attr("d", actualLine)
      .attr("fill", "none")
      .attr("stroke", "#00bfa6")
      .attr("transform", "translate(50, 50)"); // Adjust position

    // Drawing the target line
    svg
      .selectAll(".line-target")
      .data([chartData])
      .join("path")
      .attr("class", "line-target")
      .attr("d", targetLine)
      .attr("fill", "none")
      .attr("stroke", "#ff0000")
      .attr("transform", "translate(50, 50)"); // Adjust position
  }, [chartData]);

  return (
    <svg ref={svgRef}>
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
};