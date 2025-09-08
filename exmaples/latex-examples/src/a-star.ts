import {
    Array2dRecorder, ChartRecorder,
    GraphRecorder,
    LogRecorder,
    RecorderEngine,
    Recording
} from "@algorithm-visualizer/typescript-recorder";
import {FramerEngine} from "@algorithm-visualizer/typescript-framer";
import {RendererEngine} from "@algorithm-visualizer/typescript-latex-renderer";
import {writeFileSync} from "node:fs";
import {execSync} from "node:child_process";

export function simulateComplexAStar(
  graph: Record<string, Record<string, number>[]>,
  start: string,
): Recording {
  const recorderEngine = new RecorderEngine();

  recorderEngine.beginGroup();

  const logRecorder = new LogRecorder(recorderEngine, { name: 'Log', message: 'Initial state' });

  const graphRecorder = new GraphRecorder(recorderEngine, {
    name: 'Graph',
    nodes: Object.keys(graph).map((key) => ({ id: key, label: key })),
    edges: Object.entries(graph).flatMap(([node, adjacent]) =>
      adjacent.map((adj) => ({
        id: `${node}${Object.keys(adj)[0]}`,
        source: node,
        target: Object.keys(adj)[0],
        label: Object.entries(adj)[0][1].toString(),
      })),
    ),
    isDirected: true,
  });
  graphRecorder.setNodeHighlight({ id: start, highlightTags: ['open'] });

  const openRecorder = new Array2dRecorder(recorderEngine, { name: 'Open Set', values: [[start]] });
  const closedRecorder = new Array2dRecorder(recorderEngine, { name: 'Closed Set', values: [[]] });
  const costChart = new ChartRecorder(recorderEngine, {
    name: 'Node Costs',
    values: Object.keys(graph).map((n) => ({ label: n, value: 0 })),
  });

  recorderEngine.endGroup();

  const openList = [start];
  const closedList: string[] = [];
  const parents: Record<string, string> = {};
  const costs: Record<string, number> = Object.keys(graph).reduce((acc, key) => {
    acc[key] = key === start ? 0 : Infinity;
    return acc;
  }, {});

  recorderEngine.beginGroup();

  while (openList.length > 0) {
    logRecorder.setMessage({ message: `Grabbing first node from open set` });
    openRecorder.setCellsHighlight({
      rowIndex: 0,
      startIndex: 0,
      endIndex: 0,
      highlightTags: ['remove'],
    });
    recorderEngine.endGroup();

    openList.sort((x, y) => costs[x] - costs[y]);
    const current = openList.shift()!;
    closedList.push(current);

    recorderEngine.beginGroup();
    logRecorder.setMessage({ message: `Visiting node ${current} and adding it to closed set` });
    graphRecorder.setNodeHighlight({ id: current, highlightTags: ['current'] });
    openRecorder.shiftCells({ rowIndex: 0, count: 1 });
    closedRecorder.pushCells({ rowIndex: 0, values: [current] });
    closedRecorder.setCellsHighlight({
      rowIndex: 0,
      startIndex: closedList.length - 1,
      endIndex: closedList.length - 1,
      highlightTags: ['new'],
    });
    recorderEngine.endGroup();

    recorderEngine.queue(() => closedRecorder.clearAllRowsHighlight({}));

    const neighbors: Record<string, number>[] = graph[current];

    for (const neighborObj of neighbors) {
      const neighbor = Object.keys(neighborObj)[0];
      const weight = neighborObj[neighbor];
      const tentativeCost = costs[current] + weight;

      recorderEngine.beginGroup();
      logRecorder.setMessage({ message: `Checking neighbor ${neighbor}` });
      graphRecorder.setEdgeHighlight({ id: `${current}${neighbor}`, highlightTags: ['compare'] });
      recorderEngine.endGroup();

      recorderEngine.queue(() => graphRecorder.clearEdgeHighlight({ id: `${current}${neighbor}` }));

      if (tentativeCost < (costs[neighbor] ?? Infinity)) {
        costs[neighbor] = tentativeCost;
        parents[neighbor] = current;

        if (!openList.includes(neighbor) && !closedList.includes(neighbor)) {
          openList.push(neighbor);

          recorderEngine.beginGroup();
          logRecorder.setMessage({ message: `Adding neighbor ${neighbor} to open set` });
          openRecorder.pushCells({ rowIndex: 0, values: [neighbor] });
          openRecorder.setCellsHighlight({
            rowIndex: 0,
            startIndex: openList.length - 1,
            endIndex: openList.length - 1,
            highlightTags: ['new'],
          });
          graphRecorder.setNodeHighlight({ id: neighbor, highlightTags: ['open'] });
          recorderEngine.endGroup();

          recorderEngine.queue(() => openRecorder.clearAllRowsHighlight({}));
        }

        recorderEngine.beginGroup();
        logRecorder.setMessage({
          message: `Updating cost for neighbor ${neighbor} (cost: ${tentativeCost})`,
        });
        costChart.setCells({
          startIndex: Object.keys(graph).indexOf(neighbor),
          values: [{ label: neighbor, value: tentativeCost }],
        });
        costChart.setCellsHighlight({
          startIndex: Object.keys(graph).indexOf(neighbor),
          endIndex: Object.keys(graph).indexOf(neighbor),
          highlightTags: ['changed'],
        });
        graphRecorder.clearAllEdgesHighlight({});
        getBestPathSoFar(neighbor, parents).forEach((edge) =>
          graphRecorder.setEdgeHighlight({ id: edge, highlightTags: ['path'] }),
        );
        recorderEngine.endGroup();

        recorderEngine.queue(() => {
          costChart.clearCellsHighlight({
            startIndex: Object.keys(graph).indexOf(neighbor),
            endIndex: Object.keys(graph).indexOf(neighbor),
          });
        });
      }
    }

    recorderEngine.beginGroup();
    graphRecorder.setNodeHighlight({ id: current, highlightTags: ['closed'] });
  }

  logRecorder.setMessage({ message: `Complex A* simulation complete` });

  return recorderEngine.getRecording();
}

function getBestPathSoFar(targetNode: string, parents: Record<string, string>) {
  const path: string[] = [];
  let node = targetNode;
  while (parents[node]) {
    const parent = parents[node]!;
    path.push(`${parent}${node}`);
    node = parent;
  }
  return path.reverse();
}

const graph: Record<string, Record<string, number>[]> = {
    A: [{ B: 2 }, { C: 5 }, { D: 8 }],
    C: [{ D: 2 }, { G: 6 }, { H: 4 }],
    D: [{ E: 2 }, { H: 3 }, { I: 9 }],
    E: [{ F: 1 }, { I: 4 }, { J: 6 }],
    F: [{ G: 2 }, { J: 5 }],
    I: [{ J: 2 }, { A: 7 }],
    G: [{ H: 2 }, { I: 3 }],
    B: [{ C: 1 }, { E: 3 }, { F: 7 }],
    J: [{ B: 6 }, { F: 3 }],
    H: [{ I: 1 }, { J: 4 }],
};

const recording = simulateComplexAStar(graph, 'A');
const framer = new FramerEngine();
const animation = framer.getAnimation(recording);

const renderer = new RendererEngine();
const latexString = renderer.render(animation, {
    documentName: 'A* Algorithm',
    objectMetaData: [
        {
            type: 'Graph',
            metadata: {
                alignName: 'left',
                defaultNodeColor: 'white',
                defaultEdgeColor: 'black',
                nodeHighlightTags: [
                    { tag: 'current', color: 'blue!50' },
                    { tag: 'closed', color: 'blue!20' },
                    { tag: 'open', color: 'green!20' }
                ],
                edgeHighlightTags: [
                    { tag: 'path', color: 'green!100' },
                    { tag: 'compare', color: 'orange!70' }
                ],
            },
        },
        {
            type: 'Log',
            metadata: {
                alignName: 'left',
            }
        },
        {
            type: 'Array2D',
            metadata: {
                alignName: 'left',
                highlightTags: [
                    { tag: 'remove', color: 'red!50' },
                    { tag: 'new', color: 'green!50' },
                    { tag: 'compare', color: 'blue!50' },
                    { tag: 'swap', color: 'red!50' },
                ],
            },
        },
        {
            type: 'Chart',
            metadata: {
                alignName: 'left',
                highlightTags: [
                    { tag: 'changed', color: 'orange!70' },
                ],
            },
        },
    ],
});

const dir = 'output/a-star/';
const texFile = `${dir}/a-star.tex`;
writeFileSync(texFile, latexString);
console.log(`LaTeX written to ${texFile}`);

try {
    execSync(`pdflatex -interaction=nonstopmode -output-directory=${dir} ${texFile}`, { stdio: 'inherit' });
    console.log('PDF generated successfully.');
} catch (err) {
    console.error('Error generating PDF:', err);
}
