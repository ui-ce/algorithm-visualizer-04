import {
  ChartInitParams,
  ChartRecorder,
  LogInitParams,
  LogRecorder,
  RecorderEngine,
  Recording,
} from "../../../dist/@algorithm-visualizer/typescript-recorder";
import { FramerEngine } from "../../../dist/@algorithm-visualizer/typescript-framer";
import { RendererEngine } from "../../../dist/@algorithm-visualizer/typescript-latex-renderer";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

export function mergeSortVisualization(arr: number[]): Recording {
  const recorderEngine = new RecorderEngine();

  recorderEngine.beginGroup();

  const logInitParams: LogInitParams = {
    name: "Log",
    message: "Initial State",
  };
  const logRecorder = new LogRecorder(recorderEngine, logInitParams);

  const chartInit: ChartInitParams = {
    name: "Chart",
    values: arr.map((item) => ({ value: item, label: item.toString() })),
  };
  const chartRecorder = new ChartRecorder(recorderEngine, chartInit);

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
      highlightTags: ["section"],
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
      highlightTags: ["sorting"],
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

const arr = [42, 7, 35, 18, 50, 2, 27, 12, 45, 23, 8, 39, 1, 29, 14, 46, 31];
const recording = mergeSortVisualization(arr);
const framer = new FramerEngine();
const animation = framer.getAnimation(recording);

const renderer = new RendererEngine();
const latexString = renderer.render(animation, {
  documentName: "Merge Sort",
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
        highlightTags: [
          { tag: "section", color: "blue!50" },
          { tag: "sorting", color: "orange!50" },
        ],
      },
    },
  ],
});

const dir = "output/merge-sort/";
const texFile = `${dir}merge-sort.tex`;
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
