# @algorithm-visualizer/typescript-recorder

A TypeScript recording library for capturing algorithm execution steps in a **structured, framework-agnostic format**.  
It is designed to integrate with the **Algorithm Visualizer Framework**, where recordings can later be framed and rendered into interactive or LaTeX-based visualizations.

This package provides **Recorders** for:
- 2D Arrays (`Array2dRecorder`)
- Charts (`ChartRecorder`)
- Graphs (`GraphRecorder`)
- Logs (`LogRecorder`, optional)

Each recorder emits a sequence of **commands** that later is combing into one general sequence (`Recording`) using recorder engine, which describe what happened at each step of an algorithm.

---

## 📦 Installation

```bash
npm install @algorithm-visualizer/typescript-recorder
```

keep in mind in order to be able to install this module from npm you need to first publish the built library on npm.

---

## 📑 API Reference

### 🎲 Array2dRecorder
Manages **2D arrays** (matrices) with cell and row operations.

- `setCells({ rowIndex, startIndex, values })`
- `insertCells({ rowIndex, index, values })`
- `removeCells({ rowIndex, index, count })`
- `pushCells({ rowIndex, values })`
- `popCells({ rowIndex, count })`
- `shiftCells({ rowIndex, count })`
- `unshiftCells({ rowIndex, values })`
- `insertRows({ rowIndex, values })`
- `pushRows({ values })`
- `popRows({ count })`
- `shiftRows({ count })`
- `unshiftRows({ values })`
- `setCellsHighlight({ rowIndex, startIndex, endIndex, highlightTags })`
- `clearCellsHighlight({ rowIndex, startIndex, endIndex })`
- `clearAllCellsHighlight({ rowIndex })`
- `clearAllRowsHighlight({})`

---

### 📊 ChartRecorder
Manages **1D charts / bar arrays**.

- `setCells({ startIndex, values })`
- `insertCells({ index, values })`
- `removeCells({ index, count })`
- `pushCells({ values })`
- `popCells({ count })`
- `shiftCells({ count })`
- `unshiftCells({ values })`
- `setCellsHighlight({ startIndex, endIndex, highlightTags })`
- `clearCellsHighlight({ startIndex, endIndex })`

---

### 🔗 GraphRecorder
Manages **graphs** (nodes and edges, directed or undirected).

- `addNode({ id, label? })`
- `removeNode({ id })`
- `addEdge({ id, source, target, label? })`
- `removeEdge({ id })`
- `removeEdges({ source, target })`
- `setNodeHighlight({ id, highlightTags })`
- `clearNodeHighlight({ id })`
- `clearAllNodesHighlight({})`
- `setEdgeHighlight({ id, highlightTags })`
- `setEdgesHighlight({ source, target, highlightTags })`
- `clearEdgeHighlight({ id })`
- `clearEdgesHighlight({ source, target })`
- `clearAllEdgesHighlight({})`

---

### 📝 LogRecorder
Stores **messages** from the algorithm.

- `setMessage({ message })`
- `clearMessage({})`

---

## 📂 Data Format

All recorders produce **Commands**:

```ts
type Command = {
  id: string;        // Recorder ID
  type: string;      // Recorder type ("Array2D" | "Chart" | "Graph" | "Log")
  action: string;    // Action name
  params?: unknown;  // Action parameters
};
```

A recording is an array of CommandGroups, where each group represents an atomic step:

```ts
type Recording = CommandGroup[];
type CommandGroup = Command[];
```


---

## 🛠 Build

In order to build this module first we need to install its dependencies, so first be sure you are at the root of the module and then run the following commands:

```bash
npm i
```

This package uses `tsup` for building:

```bash
npm run build
```

The build will generate outputs into:

```ts
dist/@algorithm-visualizer/typescript-recorder/
```

---

## ⚙️ Usage Example

```ts
const recorderEngine = new RecorderEngine();

// Array2D example
const arr = new Array2dRecorder(recorderEngine, {
    name: "matrix",
    values: [
        ["1", "2"],
        ["3", "4"]
    ]
});

arr.setCells({rowIndex: 0, startIndex: 1, values: ["9"]});
arr.pushRows({values: [["5", "6"]]});
arr.setCellsHighlight({
    rowIndex: 1,
    startIndex: 0,
    endIndex: 1,
    highlightTags: ["focus"]
});

// Chart example
const chart = new ChartRecorder(recorderEngine, {
    name: "barChart",
    values: [
        {value: 10, label: "A"},
        {value: 20, label: "B"}
    ]
});

chart.pushCells({values: [{value: 30, label: "C"}]});
chart.setCellsHighlight({
    startIndex: 0,
    endIndex: 1,
    highlightTags: ["important"]
});

// Graph example
const graph = new GraphRecorder(recorderEngine, {
    name: "graph",
    nodes: [{id: "1"}, {id: "2"}],
    edges: [],
    isDirected: true
});

graph.addEdge({id: "e1", source: "1", target: "2"});
graph.setNodeHighlight({id: "1", highlightTags: ["visited"]});

// Final recording
const recording = recorderEngine.getRecording();
console.log(JSON.stringify(recording, null, 2));
```

---

## 🎨 Highlight Tags

Highlight tags are user defined **plain strings** that can be assigned to:

- Array or Chart cells
- Graph nodes
- Graph edges

They represent *logical highlight states* (e.g., `"focus"`, `"visited"`, `"important"`).  
These tags **do not directly specify colors or styles** — this separation ensures that recording and rendering stay decoupled.

When rendering, each tag must be mapped in the **renderer’s metadata** to a visual style (commonly a color, but it could also be another effect like bold outlines, animations, or special markers).

This allows the same recording to be reused with different renderers or visual styles without changing the recorded data.
