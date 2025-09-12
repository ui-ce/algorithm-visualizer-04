import {
  Array2DInitParams,
  Array2dRecorder,
  LogInitParams,
  LogRecorder,
  RecorderEngine,
} from "@algorithm-visualizer/typescript-recorder";
import { FramerEngine } from "@algorithm-visualizer/typescript-framer";
import { RendererEngine } from "@algorithm-visualizer/typescript-latex-renderer";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

function bubbleSort(arr: number[]): void {
  const recorderEngine = new RecorderEngine();

  recorderEngine.beginGroup();
  const logInitParam: LogInitParams = { name: "Log" };
  const logRecorder = new LogRecorder(recorderEngine, logInitParam, "Log");

  const arrayInitParam: Array2DInitParams = {
    name: "Array",
    values: [arr.map((v) => v.toString())],
  };
  const arrayRecorder = new Array2dRecorder(
    recorderEngine,
    arrayInitParam,
    "Array",
  );
  recorderEngine.endGroup();

  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      recorderEngine.beginGroup();
      logRecorder.setMessage({
        message: `Comparing cells at index ${j} and ${j + 1}`,
      });
      arrayRecorder.clearCellsHighlight({
        rowIndex: 0,
        startIndex: 0,
        endIndex: arr.length - 1,
      });
      arrayRecorder.setCellsHighlight({
        rowIndex: 0,
        startIndex: j,
        endIndex: j + 1,
        highlightTags: ["compare"],
      });
      recorderEngine.endGroup();

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        recorderEngine.beginGroup();
        logRecorder.setMessage({
          message: `Swapping cells at index ${j} and ${j + 1}`,
        });
        arrayRecorder.setCellsHighlight({
          rowIndex: 0,
          startIndex: j,
          endIndex: j + 1,
          highlightTags: ["compare", "swap"],
        });
        arrayRecorder.setCells({
          rowIndex: 0,
          startIndex: j,
          values: [arr[j].toString(), arr[j + 1].toString()],
        });
        recorderEngine.endGroup();
      }
    }
  }

  const recording = recorderEngine.getRecording();
  const framer = new FramerEngine();
  const animation = framer.getAnimation(recording);

  const renderer = new RendererEngine();
  const latexString = renderer.render(animation, {
    objectMetaData: [
      {
        type: "Log",
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
    ],
  });

  const dir = "output/bubble-sort/";
  const texFile = `${dir}bubble-sort.tex`;
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

const arr = [5, 2, 9, 1, 7, 12, 2, 3, 25, 14, 6, 4, 13];
bubbleSort(arr);
