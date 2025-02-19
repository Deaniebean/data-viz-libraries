import { ParetoData } from "../../utils/DataPareto";

type TransitionCount = {
  [key: string]: number;
};

const transitionCounts: { [group: string]: TransitionCount } = {};

// Initialize transition counts for each group
const initializeTransitionCounts = (group: string) => {
  const transitions = [
    // Q1-Q2 transitions
    "Q1 Backlog-Q2 Backlog",
    "Q1 Backlog-Q2 In Progress",
    "Q1 Backlog-Q2 In Review",
    "Q1 Backlog-Q2 Done",
    "Q1 In Progress-Q2 Backlog",
    "Q1 In Progress-Q2 In Progress",
    "Q1 In Progress-Q2 In Review",
    "Q1 In Progress-Q2 Done",
    "Q1 In Review-Q2 Backlog",
    "Q1 In Review-Q2 In Progress",
    "Q1 In Review-Q2 In Review",
    "Q1 In Review-Q2 Done",
    "Q1 Done-Q2 Backlog",
    "Q1 Done-Q2 In Progress",
    "Q1 Done-Q2 In Review",
    "Q1 Done-Q2 Done",
    // Q2-Q3 transitions
    "Q2 Backlog-Q3 Backlog",
    "Q2 Backlog-Q3 In Progress",
    "Q2 Backlog-Q3 In Review",
    "Q2 Backlog-Q3 Done",
    "Q2 In Progress-Q3 Backlog",
    "Q2 In Progress-Q3 In Progress",
    "Q2 In Progress-Q3 In Review",
    "Q2 In Progress-Q3 Done",
    "Q2 In Review-Q3 Backlog",
    "Q2 In Review-Q3 In Progress",
    "Q2 In Review-Q3 In Review",
    "Q2 In Review-Q3 Done",
    "Q2 Done-Q3 Backlog",
    "Q2 Done-Q3 In Progress",
    "Q2 Done-Q3 In Review",
    "Q2 Done-Q3 Done",
    // Q3-Q4 transitions
    "Q3 Backlog-Q4 Backlog",
    "Q3 Backlog-Q4 In Progress",
    "Q3 Backlog-Q4 In Review",
    "Q3 Backlog-Q4 Done",
    "Q3 In Progress-Q4 Backlog",
    "Q3 In Progress-Q4 In Progress",
    "Q3 In Progress-Q4 In Review",
    "Q3 In Progress-Q4 Done",
    "Q3 In Review-Q4 Backlog",
    "Q3 In Review-Q4 In Progress",
    "Q3 In Review-Q4 In Review",
    "Q3 In Review-Q4 Done",
    "Q3 Done-Q4 Backlog",
    "Q3 Done-Q4 In Progress",
    "Q3 Done-Q4 In Review",
    "Q3 Done-Q4 Done",
  ];

  transitionCounts[group] = {};
  transitions.forEach((transition) => {
    transitionCounts[group][transition] = 0;
  });
};

// Process the data to count transitions
ParetoData.forEach((item) => {
  const { history, group } = item;

  if (!transitionCounts[group]) {
    initializeTransitionCounts(group);
  }

  for (let i = 0; i < history.length - 1; i++) {
    if (history[i] !== null && history[i + 1] !== null) {
      const source = `Q${i + 1} ${getStatusName(history[i]!)}`;
      const target = `Q${i + 2} ${getStatusName(history[i + 1]!)}`;
      const transition = `${source}-${target}`;

      if (transitionCounts[group][transition] !== undefined) {
        transitionCounts[group][transition] += 1;
      } else {
        transitionCounts[group][transition] = 1;
      }
    }
  }
});

// Helper function to get status names
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

// Output the transition counts
Object.keys(transitionCounts).forEach((group) => {
  console.log(`Group: ${group}`);
  Object.keys(transitionCounts[group]).forEach((transition) => {
    console.log(`${transition}: ${transitionCounts[group][transition]}`);
  });
});