// src/models/array-2d/array-2d-action.enum.ts
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

// src/models/chart/chart-action.enum.ts
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

// src/models/graph/graph-action.enum.ts
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

// src/models/log/log-action.enum.ts
var LogAction = /* @__PURE__ */ ((LogAction2) => {
  LogAction2["SET_MESSAGE"] = "SetMessage";
  LogAction2["CLEAR_MESSAGE"] = "ClearMessage";
  return LogAction2;
})(LogAction || {});

// src/recorders/recorder.ts
var Recorder = class {
  constructor(_recorderEngine, _param, _type, _id = crypto.randomUUID()) {
    this._recorderEngine = _recorderEngine;
    this._param = _param;
    this._type = _type;
    this._id = _id;
    this._isDestroyed = false;
    this.record("Init", this._param);
  }
  record(action, params = {}) {
    if (this._isDestroyed) {
      return;
    }
    const command = {
      id: this._id,
      type: this._type,
      action,
      params: structuredClone(params)
    };
    this._recorderEngine.record(command);
  }
  destroy() {
    this.record("Destroy");
    this._isDestroyed = true;
  }
};

// src/recorders/array-2d-recorder.ts
var Array2dRecorder = class extends Recorder {
  constructor(recorderEngine, param, id) {
    super(recorderEngine, param, "Array2D", id);
  }
  setCells(param) {
    this.record("SetCells" /* SET_CELLS */, param);
  }
  insertCells(param) {
    this.record("InsertCells" /* INSERT_CELLS */, param);
  }
  removeCells(param) {
    this.record("RemoveCells" /* REMOVE_CELLS */, param);
  }
  pushCells(param) {
    this.record("PushCells" /* PUSH_CELLS */, param);
  }
  popCells(param) {
    this.record("PopCells" /* POP_CELLS */, param);
  }
  shiftCells(param) {
    this.record("ShiftCells" /* SHIFT_CELLS */, param);
  }
  unshiftCells(param) {
    this.record("UnshiftCells" /* UNSHIFT_CELLS */, param);
  }
  insertRows(param) {
    this.record("InsertRows" /* INSERT_ROWS */, param);
  }
  pushRows(param) {
    this.record("PushRows" /* PUSH_ROWS */, param);
  }
  popRows(param) {
    this.record("PopRows" /* POP_ROWS */, param);
  }
  shiftRows(param) {
    this.record("ShiftRows" /* SHIFT_ROWS */, param);
  }
  unshiftRows(param) {
    this.record("UnshiftRows" /* UNSHIFT_ROWS */, param);
  }
  setCellsHighlight(param) {
    this.record("SetCellsHighlight" /* SET_CELLS_HIGHLIGHT */, param);
  }
  clearCellsHighlight(param) {
    this.record("ClearCellsHighlight" /* CLEAR_CELLS_HIGHLIGHT */, param);
  }
  clearAllCellsHighlight(param) {
    this.record("ClearAllCellsHighlight" /* CLEAR_ALL_CELLS_HIGHLIGHT */, param);
  }
  clearAllRowsHighlight(param) {
    this.record("ClearAllRowsHighlight" /* CLEAR_ALL_ROWS_HIGHLIGHT */, param);
  }
};

// src/recorders/chart-recorder.ts
var ChartRecorder = class extends Recorder {
  constructor(recorderEngine, param, id) {
    super(recorderEngine, param, "Chart", id);
  }
  setCells(param) {
    this.record("SetCells" /* SET_CELLS */, param);
  }
  insertCells(param) {
    this.record("InsertCells" /* INSERT_CELLS */, param);
  }
  removeCells(param) {
    this.record("RemoveCells" /* REMOVE_CELLS */, param);
  }
  pushCells(param) {
    this.record("PushCells" /* PUSH_CELLS */, param);
  }
  popCells(param) {
    this.record("PopCells" /* POP_CELLS */, param);
  }
  shiftCells(param) {
    this.record("ShiftCells" /* SHIFT_CELLS */, param);
  }
  unshiftCells(param) {
    this.record("UnshiftCells" /* UNSHIFT_CELLS */, param);
  }
  setCellsHighlight(param) {
    this.record("SetCellsHighlight" /* SET_CELLS_HIGHLIGHT */, param);
  }
  clearCellsHighlight(param) {
    this.record("ClearCellsHighlight" /* CLEAR_CELLS_HIGHLIGHT */, param);
  }
};

// src/recorders/graph-recorder.ts
var GraphRecorder = class extends Recorder {
  constructor(recorderEngine, param, id) {
    super(recorderEngine, param, "Graph", id);
  }
  addNode(param) {
    this.record("AddNode" /* ADD_NODE */, param);
  }
  removeNode(param) {
    this.record("RemoveNode" /* REMOVE_NODE */, param);
  }
  addEdge(param) {
    this.record("AddEdge" /* ADD_EDGE */, param);
  }
  removeEdge(param) {
    this.record("RemoveEdge" /* REMOVE_EDGE */, param);
  }
  removeEdges(param) {
    this.record("RemoveEdges" /* REMOVE_EDGES */, param);
  }
  setNodeHighlight(param) {
    this.record("SetNodeHighlight" /* SET_NODE_HIGHLIGHT */, param);
  }
  clearNodeHighlight(param) {
    this.record("ClearNodeHighlight" /* CLEAR_NODE_HIGHLIGHT */, param);
  }
  clearAllNodesHighlight(param) {
    this.record("ClearAllNodesHighlight" /* CLEAR_ALL_NODES_HIGHLIGHT */, param);
  }
  setEdgeHighlight(param) {
    this.record("SetEdgeHighlight" /* SET_EDGE_HIGHLIGHT */, param);
  }
  setEdgesHighlight(param) {
    this.record("SetEdgesHighlight" /* SET_EDGES_HIGHLIGHT */, param);
  }
  clearEdgeHighlight(param) {
    this.record("ClearEdgeHighlight" /* CLEAR_EDGE_HIGHLIGHT */, param);
  }
  clearEdgesHighlight(param) {
    this.record("ClearEdgesHighlight" /* CLEAR_EDGES_HIGHLIGHT */, param);
  }
  clearAllEdgesHighlight(param) {
    this.record("ClearAllEdgesHighlight" /* CLEAR_ALL_EDGES_HIGHLIGHT */, param);
  }
};

// src/recorders/log-recorder.ts
var LogRecorder = class extends Recorder {
  constructor(recorderEngine, param, id) {
    super(recorderEngine, param, "Log", id);
  }
  setMessage(param) {
    this.record("SetMessage" /* SET_MESSAGE */, param);
  }
  clearMessage(param) {
    this.record("ClearMessage" /* CLEAR_MESSAGE */, param);
  }
};

// src/recorders/recorder-engine.ts
var RecorderEngine = class {
  constructor() {
    this._commands = [];
    this._queuedRecordFunctions = [];
    this._isGrouping = false;
  }
  record(command) {
    if (!this._isGrouping) {
      this._isGrouping = true;
      this.internalBeginGroup();
      this._isGrouping = false;
    }
    this._commands[this._commands.length - 1].push(command);
  }
  beginGroup() {
    this._isGrouping = true;
    this.internalBeginGroup();
  }
  endGroup() {
    this._isGrouping = false;
  }
  queue(recordFunction) {
    this._queuedRecordFunctions.push(recordFunction);
  }
  getRecording() {
    return this._commands;
  }
  internalBeginGroup() {
    this._commands.push([]);
    this._queuedRecordFunctions.forEach((recordFunction) => recordFunction());
    this._queuedRecordFunctions = [];
  }
};
export {
  Array2DAction,
  Array2dRecorder,
  ChartAction,
  ChartRecorder,
  GraphAction,
  GraphRecorder,
  LogAction,
  LogRecorder,
  Recorder,
  RecorderEngine
};
//# sourceMappingURL=index.mjs.map