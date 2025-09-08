import {
  Array2dRecorder,
  ChartRecorder,
  GraphRecorder,
  LogRecorder,
  RecorderEngine,
} from "@algorithm-visualizer/typescript-recorder";
import { FramerEngine } from "@algorithm-visualizer/typescript-framer";
import { RendererEngine } from "@algorithm-visualizer/typescript-latex-renderer";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const recorderEngine = new RecorderEngine();

const cities = ["A", "B", "C", "D", "E", "F", "G"];
const edges = [];
for (let i = 0; i < cities.length; i++) {
  for (let j = i + 1; j < cities.length; j++) {
    edges.push({
      id: `${cities[i]}-${cities[j]}`,
      source: cities[i],
      target: cities[j],
    });
  }
}

const distances: string[][] = [
  ["0", "10", "15", "20", "25", "18", "12"],
  ["10", "0", "35", "25", "30", "22", "28"],
  ["15", "35", "0", "30", "16", "24", "20"],
  ["20", "25", "30", "0", "18", "27", "14"],
  ["25", "30", "16", "18", "0", "12", "22"],
  ["18", "22", "24", "27", "12", "0", "26"],
  ["12", "28", "20", "14", "22", "26", "0"],
];

recorderEngine.beginGroup();
const logRecorder = new LogRecorder(recorderEngine, { name: "TSP Log", message: 'Initial State'});
const graphRecorder = new GraphRecorder(recorderEngine, {
  name: "TSP Graph",
  nodes: cities.map((city) => ({ id: city, label: city })),
  edges: edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: `${distances[cities.indexOf(edge.source)][cities.indexOf(edge.target)]}`,
  })),
  isDirected: false,
});
const array2dRecorder = new Array2dRecorder(recorderEngine, {
  name: "Distance Matrix",
  values: distances,
});
const chartRecorder = new ChartRecorder(recorderEngine, {
  name: "Tour Cost",
  values: [],
});
recorderEngine.endGroup();

const visited: string[] = [];
let current = cities[0];
visited.push(current);

recorderEngine.beginGroup();
logRecorder.setMessage({ message: `Start at city ${current}` });
graphRecorder.setNodeHighlight({ id: current, highlightTags: ["current"] });
recorderEngine.endGroup();

while (visited.length < cities.length) {
  const currentIndex = cities.indexOf(current);
  let nearestCity = "";
  let nearestDist = Infinity;

  for (let j = 0; j < cities.length; j++) {
    if (visited.includes(cities[j])) continue;
    const dist = Number(distances[currentIndex][j]);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearestCity = cities[j];
    }
  }

  visited.push(nearestCity);

  recorderEngine.beginGroup();
  logRecorder.setMessage({
    message: `Move to ${nearestCity} with distance ${nearestDist}`,
  });
  chartRecorder.pushCells({ values: [{ value: nearestDist }] });
  graphRecorder.setEdgesHighlight({
    source: current,
    target: nearestCity,
    highlightTags: ["selected"],
  });
  graphRecorder.setNodeHighlight({
    id: nearestCity,
    highlightTags: ["current"],
  });
  graphRecorder.setNodeHighlight({ id: current, highlightTags: ["visited"] });
  recorderEngine.endGroup();

  current = nearestCity;
}

const lastDist = Number(
  distances[cities.indexOf(current)][cities.indexOf(visited[0])],
);
visited.push(visited[0]);

recorderEngine.beginGroup();
logRecorder.setMessage({
  message: `Return to start ${visited[0]} with distance ${lastDist}`,
});
chartRecorder.pushCells({ values: [{ value: lastDist }] });
graphRecorder.setEdgesHighlight({
  source: current,
  target: visited[0],
  highlightTags: ["selected"],
});
graphRecorder.setNodeHighlight({ id: current, highlightTags: ["visited"] });
recorderEngine.endGroup();

logRecorder.setMessage({ message: `Tour completed: ${visited.join(" -> ")}` });

const recording = recorderEngine.getRecording();
const framer = new FramerEngine();
const animation = framer.getAnimation(recording);

const renderer = new RendererEngine();
const latexString = renderer.render(animation, {
  documentName: "TSP",
  objectMetaData: [
    {
      type: "Log",
      metadata: {
        alignName: "left",
      },
    },
    {
      type: "Chart",
      metadata: {
        alignName: "left",
      },
    },
    {
      type: "Array2D",
      metadata: {
        alignName: "left",
        highlightTags: [
          { tag: "compare", color: "blue!50" },
          { tag: "swap", color: "red!50" },
        ],
      },
    },
    {
      type: "Graph",
      metadata: {
        alignName: "left",
        defaultNodeColor: "white",
        defaultEdgeColor: "black",
        nodeHighlightTags: [
          { tag: "current", color: "blue!50" },
          { tag: "visited", color: "blue!20" },
        ],
        edgeHighlightTags: [{ tag: "selected", color: "green!100" }],
      },
    },
  ],
});

const dir = "output/tps-nearest-neighbor/";
const texFile = `${dir}tps-nearest-neighbor.tex`;
writeFileSync(texFile, latexString);
console.log(`LaTeX written to ${texFile}`);

try {
  execSync(
    `pdflatex -interaction=nonstopmode -output-directory=${dir} ${texFile}`,
    { stdio: "inherit" },
  );
  console.log("PDF generated successfully.");
} catch (err) {
  console.error("Error generating PDF:", err);
}
