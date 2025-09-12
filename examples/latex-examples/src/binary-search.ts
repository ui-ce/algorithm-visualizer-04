import {ChartRecorder, LogRecorder, RecorderEngine, Recording} from "../../../dist/@algorithm-visualizer/typescript-recorder";
import {FramerEngine} from "../../../dist/@algorithm-visualizer/typescript-framer";
import {RendererEngine} from "../../../dist/@algorithm-visualizer/typescript-latex-renderer";
import {writeFileSync} from "node:fs";
import {execSync} from "node:child_process";

export function RecordBinarySearch(array: number[], target: number): Recording {
  const recorderEngine = new RecorderEngine();

  recorderEngine.beginGroup();
  const logRecorder = new LogRecorder(recorderEngine, { name: 'Log', message: 'Initial State' });
  const chartRecorder = new ChartRecorder(recorderEngine, { name: 'Array', values: array.map(item => ({value: item})) });
  recorderEngine.endGroup();

  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);


    recorderEngine.beginGroup();
    logRecorder.setMessage({ message: `Searching from index ${left} to ${right}` });
    chartRecorder.clearCellsHighlight({ startIndex: 0, endIndex: array.length - 1 });
    chartRecorder.setCellsHighlight({ startIndex: left, endIndex: right, highlightTags: ['section'] });
    recorderEngine.endGroup();

    recorderEngine.beginGroup();
    logRecorder.setMessage({ message: `Comparing current section middle cell value with ${target}` });
    chartRecorder.setCellsHighlight({ startIndex: mid, endIndex: mid, highlightTags: ['section', 'middle'] });
    recorderEngine.endGroup();


    if (array[mid] === target) {
      // Highlight found element
      recorderEngine.beginGroup();
      logRecorder.setMessage({ message: `Found ${target} at index ${mid}` });
      chartRecorder.setCellsHighlight({ startIndex: 0, endIndex: array.length - 1, highlightTags: [] });
      chartRecorder.setCellsHighlight({ startIndex: mid, endIndex: mid,  highlightTags: ['target'] });
      recorderEngine.endGroup();

      console.log('found', mid);
      break;
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return recorderEngine.getRecording();
}

const array = [1, 3, 5, 7, 9, 11, 13, 15, 17, 20];
const target = 11;

const recording = RecordBinarySearch(array, target);
const framer = new FramerEngine();
const animation = framer.getAnimation(recording);
const renderer = new RendererEngine();
const latexString = renderer.render(animation, {
  documentName: "Binary Search",
  objectMetaData: [
    {
      type: 'Log',
      metadata: {
        alignName: 'left',
      }
    },
    {
      type: 'Chart',
      metadata: {
        alignName: 'left',
        highlightTags: [
          { tag: 'section', color: 'blue!50' },
          { tag: 'middle', color: 'brown!50' },
          { tag: 'target', color: 'green!50' }
        ]
      }
    }
  ]
});

const dir = 'output/binary-search/';
const texFile = `${dir}binary-search.tex`;
writeFileSync(texFile, latexString);
console.log(`LaTeX written to ${texFile}`);

try {
  execSync(`pdflatex -interaction=nonstopmode -output-directory=${dir} ${texFile}`, { stdio: 'inherit' });
  console.log('PDF generated successfully.');
} catch (err) {
  console.error('Error generating PDF:', err);
}
