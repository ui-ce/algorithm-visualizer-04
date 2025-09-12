import {
  Array2DInitParams,
  Array2dRecorder,
  GraphInitParams,
  GraphRecorder,
  LogInitParams,
  LogRecorder,
  RecorderEngine,
} from "@algorithm-visualizer/typescript-recorder";
import { FramerEngine } from "@algorithm-visualizer/typescript-framer";
import { RendererEngine } from "@algorithm-visualizer/typescript-latex-renderer";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

type Graph = Record<string, string[]>;

function dfs(graph: Graph, start: string) {
  const mainRecorder = new RecorderEngine();

  mainRecorder.beginGroup();

  const logInitParam: LogInitParams = {
    name: "Log",
    message: "Initial State",
  };
  const logRecorder = new LogRecorder(mainRecorder, logInitParam);

  const graphInitParam: GraphInitParams = {
    name: "Graph",
    nodes: Object.keys(graphData).map((key) => ({ id: key, label: key })),
    edges: Object.entries(graphData).flatMap(([key, value]) =>
      value.map((v) => ({ id: `${key}${v}`, source: key, target: v })),
    ),
    isDirected: false,
  };
  const graphRecorder = new GraphRecorder(mainRecorder, graphInitParam);

  const visited = new Set<string>();
  const stack: string[] = [start];

  const array2DInitParam: Array2DInitParams = {
    name: "Stack",
    values: [stack],
  };
  const stackRecorder = new Array2dRecorder(mainRecorder, array2DInitParam);

  while (stack.length > 0) {
    logRecorder.setMessage({ message: "Popping last node from stack" });
    stackRecorder.clearAllRowsHighlight({});
    stackRecorder.setCellsHighlight({
      rowIndex: 0,
      startIndex: stack.length - 1,
      endIndex: stack.length - 1,
      highlightTags: ["remove"],
    });

    mainRecorder.endGroup();

    mainRecorder.beginGroup();

    const node = stack.pop()!;
    stackRecorder.popCells({ rowIndex: 0, count: 1 });

    if (!visited.has(node)) {
      visited.add(node);
      logRecorder.setMessage({ message: `Visiting node ${node}.` });
      graphRecorder.setNodeHighlight({ id: node, highlightTags: ["visit"] });

      mainRecorder.endGroup();

      const neighbors = [...(graph[node] || [])].reverse();
      stack.push(...neighbors);

      mainRecorder.beginGroup();

      logRecorder.setMessage({
        message: `Adding node ${node}'s neighbors to stack.`,
      });
      stackRecorder.pushCells({ rowIndex: 0, values: neighbors });
      stackRecorder.setCellsHighlight({
        rowIndex: 0,
        startIndex: stack.length - neighbors.length,
        endIndex: stack.length - 1,
        highlightTags: ["new"],
      });
    }

    mainRecorder.endGroup();

    mainRecorder.beginGroup();

    graphRecorder.clearNodeHighlight({ id: node });
  }

  logRecorder.setMessage({ message: `End of DFS.` });

  const recording = mainRecorder.getRecording();

  const framer = new FramerEngine();
  const animation = framer.getAnimation(recording);

  const renderer = new RendererEngine();
  const latexString = renderer.render(animation, {
    documentName: "DFS",
    objectMetaData: [
      {
        type: "Log",
        metadata: {
          alignName: "left",
        },
      },
      {
        type: "Graph",
        metadata: {
          alignName: "left",
          nodeHighlightTags: [{ tag: "visit", color: "blue!60" }],
        },
      },
      {
        type: "Array2D",
        metadata: {
          alignName: "left",
          highlightTags: [
            { tag: "remove", color: "red!50" },
            { tag: "new", color: "green!50" },
          ],
        },
      },
    ],
  });

  const dir = "output/dfs/";
  const texFile = `${dir}dfs.tex`;
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
}

const graphData: Graph = {
  A: ["B", "C"],
  B: ["D"],
  C: ["E", "F"],
  D: [],
  E: [],
  F: [],
};

dfs(graphData, "A");
