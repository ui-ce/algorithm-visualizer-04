import {
  ChartRecorder,
  LogRecorder,
  RecorderEngine,
  Recording,
} from '@algorithm-visualizer/typescript-recorder';

export function binarySearchVisualization(array: number[], target: number): Recording {
  const recorderEngine = new RecorderEngine();

  recorderEngine.beginGroup();
  const logRecorder = new LogRecorder(recorderEngine, { name: 'Log', message: 'Initial State' });
  const chartRecorder = new ChartRecorder(recorderEngine, {
    name: 'Array',
    values: array.map((item) => ({ value: item })),
  });
  recorderEngine.endGroup();

  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    recorderEngine.beginGroup();
    logRecorder.setMessage({ message: `Searching from index ${left} to ${right}` });
    chartRecorder.clearCellsHighlight({ startIndex: 0, endIndex: array.length - 1 });
    chartRecorder.setCellsHighlight({
      startIndex: left,
      endIndex: right,
      highlightTags: ['section'],
    });
    recorderEngine.endGroup();

    recorderEngine.beginGroup();
    logRecorder.setMessage({
      message: `Comparing current section middle cell value with ${target}`,
    });
    chartRecorder.setCellsHighlight({
      startIndex: mid,
      endIndex: mid,
      highlightTags: ['section', 'middle'],
    });
    recorderEngine.endGroup();

    if (array[mid] === target) {
      recorderEngine.beginGroup();
      logRecorder.setMessage({ message: `Found ${target} at index ${mid}` });
      chartRecorder.setCellsHighlight({
        startIndex: 0,
        endIndex: array.length - 1,
        highlightTags: [],
      });
      chartRecorder.setCellsHighlight({
        startIndex: mid,
        endIndex: mid,
        highlightTags: ['target'],
      });
      recorderEngine.endGroup();

      return recorderEngine.getRecording();
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  recorderEngine.beginGroup();
  logRecorder.setMessage({ message: `${target} was not found!` });
  chartRecorder.setCellsHighlight({
    startIndex: 0,
    endIndex: array.length - 1,
    highlightTags: [],
  });
  recorderEngine.endGroup();

  return recorderEngine.getRecording();
}
