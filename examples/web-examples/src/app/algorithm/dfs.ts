import {
  Array2DInitParams,
  Array2dRecorder,
  GraphInitParams,
  GraphRecorder,
  LogInitParams,
  LogRecorder,
  RecorderEngine,
} from '@algorithm-visualizer/typescript-recorder';

type Graph = Record<string, string[]>;

export function dfsVisualization(graph: Graph) {
  const recorderEngine = new RecorderEngine();

  recorderEngine.beginGroup();

  const logInitParam: LogInitParams = {
    name: 'Log',
    message: 'Initial State',
  };
  const logRecorder = new LogRecorder(recorderEngine, logInitParam);

  const graphInitParam: GraphInitParams = {
    name: 'Graph',
    nodes: Object.keys(graph).map((key) => ({ id: key, label: key })),
    edges: Object.entries(graph).flatMap(([key, value]) =>
      value.map((v) => ({ id: `${key}${v}`, source: key, target: v })),
    ),
    isDirected: false,
  };
  const graphRecorder = new GraphRecorder(recorderEngine, graphInitParam);

  const visited = new Set<string>();
  const stack: string[] = ['A'];

  const array2DInitParam: Array2DInitParams = {
    name: 'Stack',
    values: [stack],
  };
  const stackRecorder = new Array2dRecorder(recorderEngine, array2DInitParam);

  while (stack.length > 0) {
    logRecorder.setMessage({ message: 'Popping last node from stack' });
    stackRecorder.clearAllRowsHighlight({});
    stackRecorder.setCellsHighlight({
      rowIndex: 0,
      startIndex: stack.length - 1,
      endIndex: stack.length - 1,
      highlightTags: ['remove'],
    });

    recorderEngine.endGroup();

    recorderEngine.beginGroup();

    const node = stack.pop()!;
    stackRecorder.popCells({ rowIndex: 0, count: 1 });

    if (!visited.has(node)) {
      visited.add(node);
      logRecorder.setMessage({ message: `Visiting node ${node}.` });
      graphRecorder.setNodeHighlight({ id: node, highlightTags: ['visit'] });

      recorderEngine.endGroup();

      const neighbors = [...(graph[node] || [])].reverse();
      stack.push(...neighbors);

      recorderEngine.beginGroup();

      logRecorder.setMessage({
        message: `Adding node ${node}'s neighbors to stack.`,
      });
      stackRecorder.pushCells({ rowIndex: 0, values: neighbors });
      stackRecorder.setCellsHighlight({
        rowIndex: 0,
        startIndex: stack.length - neighbors.length,
        endIndex: stack.length - 1,
        highlightTags: ['new'],
      });
    }

    recorderEngine.endGroup();

    recorderEngine.beginGroup();

    graphRecorder.clearNodeHighlight({ id: node });
  }

  logRecorder.setMessage({ message: `End of DFS.` });

  return recorderEngine.getRecording();
}
