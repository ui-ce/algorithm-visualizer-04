import {
  ChartInitParams,
  ChartRecorder,
  LogInitParams,
  LogRecorder,
  RecorderEngine,
  Recording,
} from '@algorithm-visualizer/typescript-recorder';

export function mergeSortVisualization(arr: number[]): Recording {
  const recorderEngine = new RecorderEngine();

  recorderEngine.beginGroup();

  const logInitParams: LogInitParams = {
    name: 'Log',
    message: 'Initial State',
  };
  const logRecorder = new LogRecorder(recorderEngine, logInitParams);

  const chartInitParams: ChartInitParams = {
    name: 'Chart',
    values: arr.map((item) => ({ value: item, label: item.toString() })),
  };
  const chartRecorder = new ChartRecorder(recorderEngine, chartInitParams);

  recorderEngine.endGroup();

  function mergeSort(start: number, end: number) {
    recorderEngine.beginGroup();
    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: arr.length - 1,
    });
    chartRecorder.setCellsHighlight({
      startIndex: start,
      endIndex: end,
      highlightTags: ['section'],
    });
    logRecorder.setMessage({
      message: `Sorting section from index ${start} to ${end}`,
    });
    recorderEngine.endGroup();

    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    mergeSort(start, mid);
    mergeSort(mid + 1, end);

    recorderEngine.beginGroup();
    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: arr.length - 1,
    });
    chartRecorder.setCellsHighlight({
      startIndex: start,
      endIndex: end,
      highlightTags: ['sorting'],
    });
    logRecorder.setMessage({
      message: `Merging section from index ${start} to ${end}`,
    });
    recorderEngine.endGroup();

    const merged: number[] = [];
    let left = start;
    let right = mid + 1;

    while (left <= mid && right <= end) {
      if (+arr[left] <= +arr[right]) {
        merged.push(arr[left++]);
      } else {
        merged.push(arr[right++]);
      }
    }

    while (left <= mid) merged.push(arr[left++]);
    while (right <= end) merged.push(arr[right++]);

    chartRecorder.setCells({
      startIndex: start,
      values: merged.map((item) => ({ value: item, label: item.toString() })),
    });

    for (let i = 0; i < merged.length; i++) arr[start + i] = merged[i];
  }

  mergeSort(0, arr.length - 1);

  logRecorder.setMessage({ message: `End of Merge Sort` });

  return recorderEngine.getRecording();
}
