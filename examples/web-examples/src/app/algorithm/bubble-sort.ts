import {
  ChartInitParams,
  ChartRecorder,
  LogInitParams,
  LogRecorder,
  RecorderEngine,
  Recording,
} from '@algorithm-visualizer/typescript-recorder';

export function bubbleSortVisualization(arr: number[]): Recording {
  const recorderEngine = new RecorderEngine();

  recorderEngine.beginGroup();
  const logInitParam: LogInitParams = { name: 'Log' };
  const logRecorder = new LogRecorder(recorderEngine, logInitParam, 'Log');

  const chartInitParams: ChartInitParams = {
    name: 'Chart',
    values: arr.map((v) => ({ value: v, label: v.toString() })),
  };
  const chartRecorder = new ChartRecorder(recorderEngine, chartInitParams, 'Array');
  recorderEngine.endGroup();

  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      recorderEngine.beginGroup();
      logRecorder.setMessage({ message: `Comparing cells at index ${j} and ${j + 1}` });
      chartRecorder.clearCellsHighlight({ startIndex: 0, endIndex: arr.length - 1 });
      chartRecorder.setCellsHighlight({
        startIndex: j,
        endIndex: j + 1,
        highlightTags: ['compare'],
      });
      recorderEngine.endGroup();

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        recorderEngine.beginGroup();
        logRecorder.setMessage({ message: `Swapping cells at index ${j} and ${j + 1}` });
        chartRecorder.setCellsHighlight({
          startIndex: j,
          endIndex: j + 1,
          highlightTags: ['compare', 'swap'],
        });
        chartRecorder.setCells({
          startIndex: j,
          values: [
            { value: arr[j], label: arr[j].toString() },
            { value: arr[j + 1], label: arr[j + 1].toString() },
          ],
        });
        recorderEngine.endGroup();
      }
    }
  }

  return recorderEngine.getRecording();
}
