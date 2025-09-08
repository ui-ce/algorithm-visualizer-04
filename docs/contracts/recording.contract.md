# Recording Contract

This document defines the contract between the **Recorder** module and the **Framer** module. It describes the structure of the recordings, the actions supported by each recorder type, and the required data models. By following this contract, recorder implementations in any language can produce outputs that the framer can interpret, ensuring compatibility across platforms.

---

## General Concepts

- **Recorder**: Captures all operations, events, and changes occurring in a data structure during algorithm execution.
- **Framer**: Consumes the recording produced by the recorder and converts it into a sequence of **frames** representing the algorithm's state at discrete moments.
- **Command**: A single atomic action performed by a recorder. Each command has:
    - `id`: Unique identifier.
    - `type`: The type of recorder (`Array2D`, `Chart`, `Graph`, `Log`).
    - `action`: The specific action performed (e.g., `SetCells`, `AddNode`).
    - `params`: Parameters required for the action.

- **CommandGroup**: A batch of commands executed together, representing an atomic step in the algorithm.
- **Recording**: A sequence of `CommandGroup`s forming the complete recorded execution.

---

## 1. Array2D Recorder

The Array2D recorder models two-dimensional arrays. Supported actions and their parameters:

| Action | Params | Description |
|--------|--------|-------------|
| `SetCells` | `{ rowIndex, startIndex, values }` | Replace cells in a row starting from `startIndex`. |
| `InsertCells` | `{ rowIndex, index, values }` | Insert new cells into a row at given `index`. |
| `RemoveCells` | `{ rowIndex, index, count }` | Remove `count` cells starting at `index` in a row. |
| `PushCells` | `{ rowIndex, values }` | Append cells to the end of a row. |
| `PopCells` | `{ rowIndex, count }` | Remove `count` cells from the end of a row. |
| `ShiftCells` | `{ rowIndex, count }` | Remove `count` cells from the start of a row. |
| `UnshiftCells` | `{ rowIndex, values }` | Add cells to the start of a row. |
| `InsertRows` | `{ rowIndex, values }` | Insert new rows starting at `rowIndex`. |
| `PushRows` | `{ values }` | Append rows at the end of the array. |
| `PopRows` | `{ count }` | Remove `count` rows from the end. |
| `ShiftRows` | `{ count }` | Remove `count` rows from the start. |
| `UnshiftRows` | `{ values }` | Add rows to the start of the array. |
| `SetCellsHighlight` | `{ rowIndex, startIndex, endIndex, highlightTags }` | Highlight a range of cells. |
| `ClearCellsHighlight` | `{ rowIndex, startIndex, endIndex }` | Clear highlight for a range of cells. |
| `ClearAllCellsHighlight` | `{ rowIndex }` | Clear highlights in a single row. |
| `ClearAllRowsHighlight` | `{}` | Clear highlights in the entire array. |

**Initialization**:
```ts
{ name: string; values: string[][] }
```

## 2. Chart Recorder

The Chart recorder models a **1-dimensional array of numeric entries** (bars in a chart) with optional labels.

### Supported Actions

| Action | Params | Description |
|--------|--------|-------------|
| `SetCells` | `{ startIndex, values: ChartEntry[] }` | Replace chart entries starting from an index. |
| `RemoveCells` | `{ index, count }` | Remove a sequence of entries. |
| `InsertCells` | `{ index, values: ChartEntry[] }` | Insert new entries at a given index. |
| `PushCells` | `{ values: ChartEntry[] }` | Append entries at the end of the chart. |
| `PopCells` | `{ count }` | Remove entries from the end. |
| `ShiftCells` | `{ count }` | Remove entries from the beginning. |
| `UnshiftCells` | `{ values: ChartEntry[] }` | Prepend entries to the beginning. |
| `SetCellsHighlight` | `{ startIndex, endIndex, highlightTags }` | Highlight entries in the given range with tags. |
| `ClearCellsHighlight` | `{ startIndex, endIndex }` | Remove highlights from a range of entries. |

### Initialization

```ts
{
    name: string;
    values: { value: number; label?: string }[];
}
```

## 3. Graph Recorder

The Graph recorder models **nodes** and **edges** in a graph structure.

### Supported Actions

| Action | Params | Description |
|--------|--------|-------------|
| `AddNode` | `{ id, label? }` | Add a new node with optional label. |
| `RemoveNode` | `{ id }` | Remove a node by its ID. |
| `AddEdge` | `{ id, source, target, label? }` | Add an edge between two nodes. |
| `RemoveEdge` | `{ id }` | Remove a single edge by ID. |
| `RemoveEdges` | `{ source, target }` | Remove all edges between the specified source and target nodes. |
| `SetNodeHighlight` | `{ id, highlightTags }` | Apply highlight tags to a node. |
| `ClearNodeHighlight` | `{ id }` | Remove highlights from a node. |
| `ClearAllNodesHighlight` | `{}` | Remove highlights from all nodes. |
| `SetEdgeHighlight` | `{ id, highlightTags }` | Highlight a specific edge by ID. |
| `SetEdgesHighlight` | `{ source, target, highlightTags }` | Highlight all edges between two nodes. |
| `ClearEdgeHighlight` | `{ id }` | Clear highlight from a specific edge. |
| `ClearEdgesHighlight` | `{ source, target }` | Clear highlights from all edges between two nodes. |
| `ClearAllEdgesHighlight` | `{}` | Clear highlights from all edges. |

### Initialization

```ts
{
  name: string;
  nodes: GraphAddNodeParams[];
  edges: GraphAddEdgeParams[];
  isDirected: boolean;
}
```

## 4. Log Recorder

The Log recorder captures **textual messages**.

### Supported Actions

| Action | Params | Description |
|--------|--------|-------------|
| `SetMessage` | `{ message: string }` | Set a new log message. |
| `ClearMessage` | `{}` | Clear the log. |

### Initialization

```ts
{
  name: string;
  message?: string;
}
```

## 5. Implementing the Recorder in Another Language

The contract requires that each recorder **outputs commands according to the models described above**.

The **Framer** module does not care about *how* commands are produced internally, only that the output matches the expected structure:

Command → CommandGroup → Recording


### Implementation Steps

1. Maintain the internal state of the recorder in your target language.
2. Translate state changes into **commands** with the correct `type`, `action`, and `params`.
3. Emit **CommandGroup**s at atomic steps (representing one frame).
4. Return a **Recording** array containing all `CommandGroup`s.

If the output adheres to this contract, the **Framer** and **Renderer** modules can operate without modification — ensuring cross-language and cross-platform compatibility.


