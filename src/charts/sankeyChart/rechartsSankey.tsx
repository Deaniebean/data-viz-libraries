import { Sankey, Tooltip } from "recharts";

const data = {
  nodes: [
    { name: "Development" },
    { name: "Refactoring/Fixes" },
    { name: "Testing" },
    { name: "Maintenance" },
    { name: "Application Onboarding" },
  ],
  links: [
    { source: 0, target: 1, value: 30 },
    { source: 0, target: 2, value: 50 },
    { source: 2, target: 3, value: 20 },
    { source: 1, target: 3, value: 10 },
    { source: 3, target: 4, value: 40 },
  ],
};

export const RechartsSankey= () => (
  <div style={{ width: "100%", height: 500 }}>
    <h1 style={{ textAlign: "center", fontSize: "24px", marginBottom: "20px" }}>
      Software Lifecycle Flow
    </h1>
    <Sankey
      width={960}
      height={500}
      data={data}
      node={{ name: "name" }}
      link={{ stroke: "#888", strokeWidth: 2, opacity: 0.7 }}
    >
      <Tooltip />
    </Sankey>
  </div>
);


