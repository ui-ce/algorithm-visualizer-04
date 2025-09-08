// src/models/recorder/array-2d/array-2d-action.enum.ts
var Array2DAction = /* @__PURE__ */ ((Array2DAction2) => {
  Array2DAction2["SET_CELLS"] = "SetCells";
  Array2DAction2["INSERT_CELLS"] = "InsertCells";
  Array2DAction2["REMOVE_CELLS"] = "RemoveCells";
  Array2DAction2["PUSH_CELLS"] = "PushCells";
  Array2DAction2["POP_CELLS"] = "PopCells";
  Array2DAction2["SHIFT_CELLS"] = "ShiftCells";
  Array2DAction2["UNSHIFT_CELLS"] = "UnshiftCells";
  Array2DAction2["INSERT_ROWS"] = "InsertRows";
  Array2DAction2["PUSH_ROWS"] = "PushRows";
  Array2DAction2["POP_ROWS"] = "PopRows";
  Array2DAction2["SHIFT_ROWS"] = "ShiftRows";
  Array2DAction2["UNSHIFT_ROWS"] = "UnshiftRows";
  Array2DAction2["SET_CELLS_HIGHLIGHT"] = "SetCellsHighlight";
  Array2DAction2["CLEAR_CELLS_HIGHLIGHT"] = "ClearCellsHighlight";
  Array2DAction2["CLEAR_ALL_CELLS_HIGHLIGHT"] = "ClearAllCellsHighlight";
  Array2DAction2["CLEAR_ALL_ROWS_HIGHLIGHT"] = "ClearAllRowsHighlight";
  return Array2DAction2;
})(Array2DAction || {});

// src/framers/array-2d-framer.ts
var Array2DFramer = class {
  initialize(id, param) {
    this._id = id;
    this._array2D = {
      name: param.name,
      values: param.values.map(
        (row) => row.map((item) => ({ value: item, highlightTags: [] }))
      )
    };
  }
  applyAction(action, param) {
    switch (action) {
      case "SetCells" /* SET_CELLS */:
        this.setCells(param);
        break;
      case "InsertCells" /* INSERT_CELLS */:
        this.insertCells(param);
        break;
      case "RemoveCells" /* REMOVE_CELLS */:
        this.removeCells(param);
        break;
      case "PushCells" /* PUSH_CELLS */:
        this.pushCells(param);
        break;
      case "PopCells" /* POP_CELLS */:
        this.popCells(param);
        break;
      case "ShiftCells" /* SHIFT_CELLS */:
        this.shiftCells(param);
        break;
      case "UnshiftCells" /* UNSHIFT_CELLS */:
        this.unshiftCells(param);
        break;
      case "InsertRows" /* INSERT_ROWS */:
        this.insertRows(param);
        break;
      case "PushRows" /* PUSH_ROWS */:
        this.pushRows(param);
        break;
      case "PopRows" /* POP_ROWS */:
        this.popRows(param);
        break;
      case "ShiftRows" /* SHIFT_ROWS */:
        this.shiftRows(param);
        break;
      case "UnshiftRows" /* UNSHIFT_ROWS */:
        this.unshiftRows(param);
        break;
      case "SetCellsHighlight" /* SET_CELLS_HIGHLIGHT */:
        this.setCellsHighlight(param);
        break;
      case "ClearCellsHighlight" /* CLEAR_CELLS_HIGHLIGHT */:
        this.clearCellsHighlight(param);
        break;
      case "ClearAllCellsHighlight" /* CLEAR_ALL_CELLS_HIGHLIGHT */:
        this.clearAllCellsHighlight(param);
        break;
      case "ClearAllRowsHighlight" /* CLEAR_ALL_ROWS_HIGHLIGHT */:
        this.clearAllRowsHighlight(param);
        break;
      default:
        throw new Error(`Unknown Array2DAction: ${action}`);
    }
  }
  setCells({ rowIndex, startIndex, values }) {
    const row = this._array2D.values[rowIndex];
    if (!row) return;
    values.forEach((value, idx) => {
      const targetIndex = startIndex + idx;
      if (row[targetIndex]) {
        const oldCell = row[targetIndex];
        row[targetIndex] = { ...oldCell, value };
      }
    });
  }
  insertCells({ rowIndex, index, values }) {
    const row = this._array2D.values[rowIndex];
    if (!row) return;
    const cells = values.map((v) => ({ value: v, highlightTags: [] }));
    row.splice(index, 0, ...cells);
  }
  removeCells({ rowIndex, index, count }) {
    const row = this._array2D.values[rowIndex];
    if (!row) return;
    row.splice(index, count);
  }
  pushCells({ rowIndex, values }) {
    const row = this._array2D.values[rowIndex];
    if (!row) return;
    const cells = values.map((v) => ({ value: v, highlightTags: [] }));
    row.push(...cells);
  }
  popCells({ rowIndex, count }) {
    const row = this._array2D.values[rowIndex];
    if (!row) return;
    row.splice(-count, count);
  }
  shiftCells({ rowIndex, count }) {
    const row = this._array2D.values[rowIndex];
    if (!row) return;
    row.splice(0, count);
  }
  unshiftCells({ rowIndex, values }) {
    const row = this._array2D.values[rowIndex];
    if (!row) return;
    const cells = values.map((v) => ({ value: v, highlightTags: [] }));
    row.unshift(...cells);
  }
  insertRows({ rowIndex, values }) {
    const rows = values.map(
      (r) => r.map((item) => ({ value: item, highlightTags: [] }))
    );
    this._array2D.values.splice(rowIndex, 0, ...rows);
  }
  pushRows({ values }) {
    const rows = values.map(
      (r) => r.map((item) => ({ value: item, highlightTags: [] }))
    );
    this._array2D.values.push(...rows);
  }
  popRows({ count }) {
    this._array2D.values.splice(-count, count);
  }
  shiftRows({ count }) {
    this._array2D.values.splice(0, count);
  }
  unshiftRows({ values }) {
    const rows = values.map(
      (r) => r.map((item) => ({ value: item, highlightTags: [] }))
    );
    this._array2D.values.unshift(...rows);
  }
  setCellsHighlight({ rowIndex, startIndex, endIndex, highlightTags }) {
    const row = this._array2D.values[rowIndex];
    if (!row) return;
    for (let i = startIndex; i <= endIndex; i++) {
      if (row[i]) {
        row[i].highlightTags = [...highlightTags];
      }
    }
  }
  clearCellsHighlight({ rowIndex, startIndex, endIndex }) {
    const row = this._array2D.values[rowIndex];
    if (!row) return;
    for (let i = startIndex; i <= endIndex; i++) {
      if (row[i]) {
        row[i].highlightTags = [];
      }
    }
  }
  clearAllCellsHighlight({ rowIndex }) {
    const row = this._array2D.values[rowIndex];
    if (!row) {
      return;
    }
    row.forEach((cell) => cell.highlightTags = []);
  }
  clearAllRowsHighlight(params) {
    this._array2D.values.forEach((row) => row.forEach((cell) => cell.highlightTags = []));
  }
  getFrameState() {
    return {
      id: this._id,
      type: "Array2D",
      state: this._array2D
    };
  }
};

// src/models/recorder/chart/chart-action.enum.ts
var ChartAction = /* @__PURE__ */ ((ChartAction2) => {
  ChartAction2["SET_CELLS"] = "SetCells";
  ChartAction2["REMOVE_CELLS"] = "RemoveCells";
  ChartAction2["INSERT_CELLS"] = "InsertCells";
  ChartAction2["PUSH_CELLS"] = "PushCells";
  ChartAction2["POP_CELLS"] = "PopCells";
  ChartAction2["SHIFT_CELLS"] = "ShiftCells";
  ChartAction2["UNSHIFT_CELLS"] = "UnshiftCells";
  ChartAction2["SET_CELLS_HIGHLIGHT"] = "SetCellsHighlight";
  ChartAction2["CLEAR_CELLS_HIGHLIGHT"] = "ClearCellsHighlight";
  return ChartAction2;
})(ChartAction || {});

// src/framers/chart-framer.ts
var ChartFramer = class {
  initialize(id, param) {
    this._id = id;
    this._chart = {
      name: param.name,
      bars: param.values.map((v) => ({
        value: v.value,
        label: v.label ?? null,
        highlightTags: []
      }))
    };
  }
  applyAction(action, param) {
    switch (action) {
      case "SetCells" /* SET_CELLS */:
        this.setCells(param);
        break;
      case "InsertCells" /* INSERT_CELLS */:
        this.insertCells(param);
        break;
      case "RemoveCells" /* REMOVE_CELLS */:
        this.removeCells(param);
        break;
      case "PushCells" /* PUSH_CELLS */:
        this.pushCells(param);
        break;
      case "PopCells" /* POP_CELLS */:
        this.popCells(param);
        break;
      case "ShiftCells" /* SHIFT_CELLS */:
        this.shiftCells(param);
        break;
      case "UnshiftCells" /* UNSHIFT_CELLS */:
        this.unshiftCells(param);
        break;
      case "SetCellsHighlight" /* SET_CELLS_HIGHLIGHT */:
        this.setCellsHighlight(param);
        break;
      case "ClearCellsHighlight" /* CLEAR_CELLS_HIGHLIGHT */:
        this.clearCellsHighlight(param);
        break;
      default:
        throw new Error(`Unknown ChartAction: ${action}`);
    }
  }
  setCells({ startIndex, values }) {
    for (let i = 0; i < values.length; i++) {
      const target = this._chart.bars[startIndex + i];
      target.value = values[i].value;
      target.label = values[i].label ?? null;
    }
  }
  insertCells({ index, values }) {
    const newBars = values.map((v) => ({
      value: v.value,
      label: v.label ?? null,
      highlightTags: []
    }));
    this._chart.bars.splice(index, 0, ...newBars);
  }
  removeCells({ index, count }) {
    this._chart.bars.splice(index, count);
  }
  pushCells({ values }) {
    const newBars = values.map((v) => ({
      value: v.value,
      label: v.label ?? null,
      highlightTags: []
    }));
    this._chart.bars.push(...newBars);
  }
  popCells({ count }) {
    this._chart.bars.splice(-count, count);
  }
  shiftCells({ count }) {
    this._chart.bars.splice(0, count);
  }
  unshiftCells({ values }) {
    const newBars = values.map((v) => ({
      value: v.value,
      label: v.label ?? null,
      highlightTags: []
    }));
    this._chart.bars.unshift(...newBars);
  }
  setCellsHighlight({ startIndex, endIndex, highlightTags }) {
    for (let i = startIndex; i <= endIndex; i++) {
      this._chart.bars[i].highlightTags = highlightTags;
    }
  }
  clearCellsHighlight({ startIndex, endIndex }) {
    for (let i = startIndex; i <= endIndex; i++) {
      this._chart.bars[i].highlightTags = [];
    }
  }
  getFrameState() {
    return {
      id: this._id,
      type: "Chart",
      state: {
        name: this._chart.name,
        bars: this._chart.bars
      }
    };
  }
};

// src/models/recorder/graph/graph-action.enum.ts
var GraphAction = /* @__PURE__ */ ((GraphAction2) => {
  GraphAction2["ADD_NODE"] = "AddNode";
  GraphAction2["REMOVE_NODE"] = "RemoveNode";
  GraphAction2["ADD_EDGE"] = "AddEdge";
  GraphAction2["REMOVE_EDGE"] = "RemoveEdge";
  GraphAction2["REMOVE_EDGES"] = "RemoveEdges";
  GraphAction2["SET_NODE_HIGHLIGHT"] = "SetNodeHighlight";
  GraphAction2["CLEAR_NODE_HIGHLIGHT"] = "ClearNodeHighlight";
  GraphAction2["CLEAR_ALL_NODES_HIGHLIGHT"] = "ClearAllNodesHighlight";
  GraphAction2["SET_EDGE_HIGHLIGHT"] = "SetEdgeHighlight";
  GraphAction2["SET_EDGES_HIGHLIGHT"] = "SetEdgesHighlight";
  GraphAction2["CLEAR_EDGE_HIGHLIGHT"] = "ClearEdgeHighlight";
  GraphAction2["CLEAR_EDGES_HIGHLIGHT"] = "ClearEdgesHighlight";
  GraphAction2["CLEAR_ALL_EDGES_HIGHLIGHT"] = "ClearAllEdgesHighlight";
  return GraphAction2;
})(GraphAction || {});

// src/framers/graph-framer.ts
var GraphFramer = class {
  initialize(id, param) {
    this._id = id;
    this._graphState = {
      name: param.name,
      isDirected: param.isDirected,
      nodes: param.nodes.map((node) => ({
        id: node.id,
        label: node.label ?? null,
        highlightTags: []
      })),
      edges: param.edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label ?? null,
        highlightTags: []
      }))
    };
  }
  applyAction(action, param) {
    switch (action) {
      case "AddNode" /* ADD_NODE */:
        this.addNode(param);
        break;
      case "RemoveNode" /* REMOVE_NODE */:
        this.removeNode(param);
        break;
      case "AddEdge" /* ADD_EDGE */:
        this.addEdge(param);
        break;
      case "RemoveEdge" /* REMOVE_EDGE */:
        this.removeEdge(param);
        break;
      case "RemoveEdges" /* REMOVE_EDGES */:
        this.removeEdges(param);
        break;
      case "SetNodeHighlight" /* SET_NODE_HIGHLIGHT */:
        this.setNodeHighlight(param);
        break;
      case "ClearNodeHighlight" /* CLEAR_NODE_HIGHLIGHT */:
        this.clearNodeHighlight(param);
        break;
      case "ClearAllNodesHighlight" /* CLEAR_ALL_NODES_HIGHLIGHT */:
        this.clearAllNodesHighlight(param);
        break;
      case "SetEdgeHighlight" /* SET_EDGE_HIGHLIGHT */:
        this.setEdgeHighlight(param);
        break;
      case "SetEdgesHighlight" /* SET_EDGES_HIGHLIGHT */:
        this.setEdgesHighlight(param);
        break;
      case "ClearEdgeHighlight" /* CLEAR_EDGE_HIGHLIGHT */:
        this.clearEdgeHighlight(param);
        break;
      case "ClearEdgesHighlight" /* CLEAR_EDGES_HIGHLIGHT */:
        this.clearEdgesHighlight(param);
        break;
      case "ClearAllEdgesHighlight" /* CLEAR_ALL_EDGES_HIGHLIGHT */:
        this.clearAllEdgesHighlight(param);
        break;
      default:
        throw new Error(`Unknown GraphAction: ${action}`);
    }
  }
  addNode(param) {
    if (!this._graphState.nodes.find((n) => n.id === param.id)) {
      this._graphState.nodes.push({
        id: param.id,
        label: param.label ?? null,
        highlightTags: []
      });
    }
  }
  removeNode(param) {
    this._graphState.nodes = this._graphState.nodes.filter((n) => n.id !== param.id);
    this._graphState.edges = this._graphState.edges.filter(
      (e) => e.source !== param.id && e.target !== param.id
    );
  }
  addEdge(param) {
    const sourceExists = this._graphState.nodes.some((n) => n.id === param.source);
    const targetExists = this._graphState.nodes.some((n) => n.id === param.target);
    const edgeExists = this._graphState.edges.some((e) => e.id === param.id);
    if (sourceExists && targetExists && !edgeExists) {
      this._graphState.edges.push({
        id: param.id,
        source: param.source,
        target: param.target,
        label: param.label ?? null,
        highlightTags: []
      });
    }
  }
  removeEdge(param) {
    this._graphState.edges = this._graphState.edges.filter((e) => e.id !== param.id);
  }
  removeEdges(param) {
    const { source, target } = param;
    this._graphState.edges = this._graphState.edges.filter((e) => {
      if (this._graphState.isDirected) {
        return !(e.source === source && e.target === target);
      } else {
        return !(e.source === source && e.target === target || e.source === target && e.target === source);
      }
    });
  }
  setNodeHighlight(param) {
    const node = this._graphState.nodes.find((n) => n.id === param.id);
    if (node) {
      node.highlightTags = Array.from(/* @__PURE__ */ new Set([...node.highlightTags, ...param.highlightTags]));
    }
  }
  clearNodeHighlight(param) {
    const node = this._graphState.nodes.find((n) => n.id === param.id);
    if (node) {
      node.highlightTags = [];
    }
  }
  clearAllNodesHighlight(param) {
    this._graphState.nodes.forEach((node) => node.highlightTags = []);
  }
  setEdgeHighlight(param) {
    const edge = this._graphState.edges.find((e) => e.id === param.id);
    if (edge) {
      edge.highlightTags = param.highlightTags;
    }
  }
  setEdgesHighlight(param) {
    const { source, target, highlightTags } = param;
    this._graphState.edges.forEach((e) => {
      const matches = this._graphState.isDirected ? e.source === source && e.target === target : e.source === source && e.target === target || e.source === target && e.target === source;
      if (matches) {
        e.highlightTags = highlightTags;
      }
    });
  }
  clearEdgeHighlight(param) {
    const edge = this._graphState.edges.find((e) => e.id === param.id);
    if (edge) {
      edge.highlightTags = [];
    }
  }
  clearEdgesHighlight(param) {
    const { source, target } = param;
    this._graphState.edges.forEach((e) => {
      const matches = this._graphState.isDirected ? e.source === source && e.target === target : e.source === source && e.target === target || e.source === target && e.target === source;
      if (matches) {
        e.highlightTags = [];
      }
    });
  }
  clearAllEdgesHighlight(param) {
    this._graphState.edges.forEach((e) => e.highlightTags = []);
  }
  getFrameState() {
    return {
      id: this._id,
      type: "Graph",
      state: this._graphState
    };
  }
};

// src/models/recorder/log/log-action.enum.ts
var LogAction = /* @__PURE__ */ ((LogAction2) => {
  LogAction2["SET_MESSAGE"] = "SetMessage";
  LogAction2["CLEAR_MESSAGE"] = "ClearMessage";
  return LogAction2;
})(LogAction || {});

// src/framers/log-framer.ts
var LogFramer = class {
  initialize(id, param) {
    this._id = id;
    this._log = {
      name: param.name,
      message: param.message ?? null
    };
  }
  applyAction(action, param) {
    switch (action) {
      case "SetMessage" /* SET_MESSAGE */:
        this.setMessage(param);
        break;
      case "ClearMessage" /* CLEAR_MESSAGE */:
        this.clearMessage();
        break;
      default:
        throw new Error(`Unknown LogAction: ${action}`);
    }
  }
  setMessage({ message }) {
    this._log.message = message;
  }
  clearMessage() {
    this._log.message = null;
  }
  getFrameState() {
    return {
      id: this._id,
      type: "Log",
      state: this._log
    };
  }
};

// src/framers/framer-engine.ts
var FramerEngine = class {
  constructor() {
    this.framerClassMap = /* @__PURE__ */ new Map([
      ["Graph", GraphFramer],
      ["Array2D", Array2DFramer],
      ["Chart", ChartFramer],
      ["Log", LogFramer]
    ]);
    this.framerInstanceMap = /* @__PURE__ */ new Map();
  }
  getAnimation(recording) {
    const animation = [];
    for (const commandGroup of recording) {
      for (const command of commandGroup) {
        const { id, type, action, params } = command;
        if (action === "Init") {
          this.initializeFramer(id, type, params);
          continue;
        }
        if (action === "Destroy") {
          this.framerInstanceMap.delete(id);
          continue;
        }
        const framerInstance = this.framerInstanceMap.get(id);
        if (!framerInstance) {
          throw new Error(`No framer has been initialized for type: ${type}, id: ${id}`);
        }
        framerInstance.applyAction(action, params);
      }
      if (this.framerInstanceMap.size === 0) {
        continue;
      }
      animation.push(Array.from(this.framerInstanceMap.values()).map((framerInstance) => structuredClone(framerInstance.getFrameState())));
    }
    return animation;
  }
  initializeFramer(id, type, params) {
    const framerClass = this.framerClassMap.get(type);
    if (!framerClass) {
      throw new Error(`No framer registered for type: ${type}`);
    }
    const framerInstance = new framerClass();
    framerInstance.initialize(id, params);
    this.framerInstanceMap.set(id, framerInstance);
  }
};
export {
  Array2DAction,
  Array2DFramer,
  ChartAction,
  ChartFramer,
  FramerEngine,
  GraphAction,
  GraphFramer,
  LogAction,
  LogFramer
};
//# sourceMappingURL=index.mjs.map