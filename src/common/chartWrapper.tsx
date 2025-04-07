import * as React from "react";
import { useState } from "react";

interface ChartWrapperProps {
  title: string;
  children: (size: { width: string; height: string }) => React.ReactNode;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({ title, children }) => {
  const [screenSize, setScreenSize] = useState<"small" | "large">("large");

  const handleScreenSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setScreenSize(event.target.value as "small" | "large");
  };

  const getChartDimensions = () => {
    switch (screenSize) {
      case "small":
        return { width: "600px", height: "400px" };
      case "large":
      default:
        return { width: "1000px", height: "600px" };
    }
  };

  const { width, height } = getChartDimensions();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>{title}</h1>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "1rem" }}>
          <input
            type="radio"
            value="small"
            checked={screenSize === "small"}
            onChange={handleScreenSizeChange}
          />
          Small
        </label>
        <label>
          <input
            type="radio"
            value="large"
            checked={screenSize === "large"}
            onChange={handleScreenSizeChange}
          />
          Large
        </label>
      </div>
      <div style={{ width, height }}>
        {children({ width, height })}
      </div>
    </div>
  );
};
