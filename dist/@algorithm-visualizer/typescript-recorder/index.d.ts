declare enum Array2DAction {
    SET_CELLS = "SetCells",
    INSERT_CELLS = "InsertCells",
    REMOVE_CELLS = "RemoveCells",
    PUSH_CELLS = "PushCells",
    POP_CELLS = "PopCells",
    SHIFT_CELLS = "ShiftCells",
    UNSHIFT_CELLS = "UnshiftCells",
    INSERT_ROWS = "InsertRows",
    PUSH_ROWS = "PushRows",
    POP_ROWS = "PopRows",
    SHIFT_ROWS = "ShiftRows",
    UNSHIFT_ROWS = "UnshiftRows",
    SET_CELLS_HIGHLIGHT = "SetCellsHighlight",
    CLEAR_CELLS_HIGHLIGHT = "ClearCellsHighlight",
    CLEAR_ALL_CELLS_HIGHLIGHT = "ClearAllCellsHighlight",
    CLEAR_ALL_ROWS_HIGHLIGHT = "ClearAllRowsHighlight"
}

type Array2DClearAllCellsHighlightParams = {
    rowIndex: number;
};

type Array2DClearAllRowsHighlightParams = {};

type Array2DClearCellsHighlightParams = {
    rowIndex: number;
    startIndex: number;
    endIndex: number;
};

type Array2DInitParams = {
    name: string;
    values: string[][];
};

type Array2DInsertCellsParams = {
    rowIndex: number;
    index: number;
    values: string[];
};

type Array2DInsertRowsParams = {
    rowIndex: number;
    values: string[][];
};

type Array2DPopCellsParams = {
    rowIndex: number;
    count: number;
};

type Array2DPopRowParams = {
    count: number;
};

type Array2DPushCellsParams = {
    rowIndex: number;
    values: string[];
};

type Array2DPushRowsParams = {
    values: string[][];
};

type Array2DRemoveCellsParams = {
    rowIndex: number;
    index: number;
    count: number;
};

type Array2DSetCellsHighlightParams = {
    rowIndex: number;
    startIndex: number;
    endIndex: number;
    highlightTags: string[];
};

type Array2DSetCellsParams = {
    rowIndex: number;
    startIndex: number;
    values: string[];
};

type Array2DShiftCellsParams = {
    rowIndex: number;
    count: number;
};

type Array2DShiftRowsParams = {
    count: number;
};

type Array2DUnshiftCellsParams = {
    rowIndex: number;
    values: string[];
};

type Array2DUnshiftRowsParams = {
    values: string[][];
};

declare enum ChartAction {
    SET_CELLS = "SetCells",
    REMOVE_CELLS = "RemoveCells",
    INSERT_CELLS = "InsertCells",
    PUSH_CELLS = "PushCells",
    POP_CELLS = "PopCells",
    SHIFT_CELLS = "ShiftCells",
    UNSHIFT_CELLS = "UnshiftCells",
    SET_CELLS_HIGHLIGHT = "SetCellsHighlight",
    CLEAR_CELLS_HIGHLIGHT = "ClearCellsHighlight"
}

type ChartClearCellsHighlightParams = {
    startIndex: number;
    endIndex: number;
};

type ChartEntry = {
    value: number;
    label?: string;
};

type ChartInitParams = {
    name: string;
    values: ChartEntry[];
};

type ChartInsertCellsParams = {
    index: number;
    values: ChartEntry[];
};

type ChartPopCellsParams = {
    count: number;
};

type ChartPushCellsParams = {
    values: ChartEntry[];
};

type ChartRemoveCellsParams = {
    index: number;
    count: number;
};

type ChartSetCellsHighlightParams = {
    startIndex: number;
    endIndex: number;
    highlightTags: string[];
};

type ChartSetCellsParams = {
    startIndex: number;
    values: ChartEntry[];
};

type ChartShiftCellsParams = {
    count: number;
};

type ChartUnshiftCellsParams = {
    values: ChartEntry[];
};

type Command = {
    id: string;
    type: string;
    action: string;
    params?: unknown;
};

type CommandGroup = Command[];

declare enum GraphAction {
    ADD_NODE = "AddNode",
    REMOVE_NODE = "RemoveNode",
    ADD_EDGE = "AddEdge",
    REMOVE_EDGE = "RemoveEdge",
    REMOVE_EDGES = "RemoveEdges",
    SET_NODE_HIGHLIGHT = "SetNodeHighlight",
    CLEAR_NODE_HIGHLIGHT = "ClearNodeHighlight",
    CLEAR_ALL_NODES_HIGHLIGHT = "ClearAllNodesHighlight",
    SET_EDGE_HIGHLIGHT = "SetEdgeHighlight",
    SET_EDGES_HIGHLIGHT = "SetEdgesHighlight",
    CLEAR_EDGE_HIGHLIGHT = "ClearEdgeHighlight",
    CLEAR_EDGES_HIGHLIGHT = "ClearEdgesHighlight",
    CLEAR_ALL_EDGES_HIGHLIGHT = "ClearAllEdgesHighlight"
}

type GraphAddEdgeParams = {
    id: string;
    source: string;
    target: string;
    label?: string;
};

type GraphAddNodeParams = {
    id: string;
    label?: string;
};

type GraphClearAllEdgesHighlightParams = {};

type GraphClearAllNodesHighlightParams = {};

type GraphClearEdgeHighlightParams = {
    id: string;
};

type GraphClearEdgesHighlightParams = {
    source: string;
    target: string;
};

type GraphClearNodeHighlightParams = {
    id: string;
};

type GraphInitParams = {
    name: string;
    nodes: GraphAddNodeParams[];
    edges: GraphAddEdgeParams[];
    isDirected: boolean;
};

type GraphRemoveEdgeParams = {
    id: string;
};

type GraphRemoveEdgesParams = {
    source: string;
    target: string;
};

type GraphRemoveNodeParams = {
    id: string;
};

type GraphSetEdgeHighlightParams = {
    id: string;
    highlightTags: string[];
};

type GraphSetEdgesHighlightParams = {
    source: string;
    target: string;
    highlightTags: string[];
};

type GraphSetNodeHighlightParams = {
    id: string;
    highlightTags: string[];
};

declare enum LogAction {
    SET_MESSAGE = "SetMessage",
    CLEAR_MESSAGE = "ClearMessage"
}

type LogClearMessageParams = {};

type LogInitParams = {
    name: string;
    message?: string;
};

type LogSetMessageParams = {
    message: string;
};

type Recording = CommandGroup[];

declare class RecorderEngine {
    private readonly _commands;
    private _queuedRecordFunctions;
    private _isGrouping;
    record(command: Command): void;
    beginGroup(): void;
    endGroup(): void;
    queue(recordFunction: Function): void;
    getRecording(): Recording;
    internalBeginGroup(): void;
}

declare abstract class Recorder {
    private readonly _recorderEngine;
    private readonly _param;
    private readonly _type;
    private readonly _id;
    private _isDestroyed;
    protected constructor(_recorderEngine: RecorderEngine, _param: unknown, _type: string, _id?: string);
    protected record(action: string, params?: unknown): void;
    destroy(): void;
}

declare class Array2dRecorder extends Recorder {
    constructor(recorderEngine: RecorderEngine, param: Array2DInitParams, id?: string);
    setCells(param: Array2DSetCellsParams): void;
    insertCells(param: Array2DInsertCellsParams): void;
    removeCells(param: Array2DRemoveCellsParams): void;
    pushCells(param: Array2DPushCellsParams): void;
    popCells(param: Array2DPopCellsParams): void;
    shiftCells(param: Array2DShiftCellsParams): void;
    unshiftCells(param: Array2DUnshiftCellsParams): void;
    insertRows(param: Array2DInsertRowsParams): void;
    pushRows(param: Array2DPushRowsParams): void;
    popRows(param: Array2DPopRowParams): void;
    shiftRows(param: Array2DShiftRowsParams): void;
    unshiftRows(param: Array2DUnshiftRowsParams): void;
    setCellsHighlight(param: Array2DSetCellsHighlightParams): void;
    clearCellsHighlight(param: Array2DClearCellsHighlightParams): void;
    clearAllCellsHighlight(param: Array2DClearAllCellsHighlightParams): void;
    clearAllRowsHighlight(param: Array2DClearAllRowsHighlightParams): void;
}

declare class ChartRecorder extends Recorder {
    constructor(recorderEngine: RecorderEngine, param: ChartInitParams, id?: string);
    setCells(param: ChartSetCellsParams): void;
    insertCells(param: ChartInsertCellsParams): void;
    removeCells(param: ChartRemoveCellsParams): void;
    pushCells(param: ChartPushCellsParams): void;
    popCells(param: ChartPopCellsParams): void;
    shiftCells(param: ChartShiftCellsParams): void;
    unshiftCells(param: ChartUnshiftCellsParams): void;
    setCellsHighlight(param: ChartSetCellsHighlightParams): void;
    clearCellsHighlight(param: ChartClearCellsHighlightParams): void;
}

declare class GraphRecorder extends Recorder {
    constructor(recorderEngine: RecorderEngine, param: GraphInitParams, id?: string);
    addNode(param: GraphAddNodeParams): void;
    removeNode(param: GraphRemoveNodeParams): void;
    addEdge(param: GraphAddEdgeParams): void;
    removeEdge(param: GraphRemoveEdgeParams): void;
    removeEdges(param: GraphRemoveEdgesParams): void;
    setNodeHighlight(param: GraphSetNodeHighlightParams): void;
    clearNodeHighlight(param: GraphClearNodeHighlightParams): void;
    clearAllNodesHighlight(param: GraphClearAllNodesHighlightParams): void;
    setEdgeHighlight(param: GraphSetEdgeHighlightParams): void;
    setEdgesHighlight(param: GraphSetEdgesHighlightParams): void;
    clearEdgeHighlight(param: GraphClearEdgeHighlightParams): void;
    clearEdgesHighlight(param: GraphClearEdgesHighlightParams): void;
    clearAllEdgesHighlight(param: GraphClearAllEdgesHighlightParams): void;
}

declare class LogRecorder extends Recorder {
    constructor(recorderEngine: RecorderEngine, param: LogInitParams, id?: string);
    setMessage(param: LogSetMessageParams): void;
    clearMessage(param: LogClearMessageParams): void;
}

export { Array2DAction, type Array2DClearAllCellsHighlightParams, type Array2DClearAllRowsHighlightParams, type Array2DClearCellsHighlightParams, type Array2DInitParams, type Array2DInsertCellsParams, type Array2DInsertRowsParams, type Array2DPopCellsParams, type Array2DPopRowParams, type Array2DPushCellsParams, type Array2DPushRowsParams, type Array2DRemoveCellsParams, type Array2DSetCellsHighlightParams, type Array2DSetCellsParams, type Array2DShiftCellsParams, type Array2DShiftRowsParams, type Array2DUnshiftCellsParams, type Array2DUnshiftRowsParams, Array2dRecorder, ChartAction, type ChartClearCellsHighlightParams, type ChartEntry, type ChartInitParams, type ChartInsertCellsParams, type ChartPopCellsParams, type ChartPushCellsParams, ChartRecorder, type ChartRemoveCellsParams, type ChartSetCellsHighlightParams, type ChartSetCellsParams, type ChartShiftCellsParams, type ChartUnshiftCellsParams, type Command, type CommandGroup, GraphAction, type GraphAddEdgeParams, type GraphAddNodeParams, type GraphClearAllEdgesHighlightParams, type GraphClearAllNodesHighlightParams, type GraphClearEdgeHighlightParams, type GraphClearEdgesHighlightParams, type GraphClearNodeHighlightParams, type GraphInitParams, GraphRecorder, type GraphRemoveEdgeParams, type GraphRemoveEdgesParams, type GraphRemoveNodeParams, type GraphSetEdgeHighlightParams, type GraphSetEdgesHighlightParams, type GraphSetNodeHighlightParams, LogAction, type LogClearMessageParams, type LogInitParams, LogRecorder, type LogSetMessageParams, Recorder, RecorderEngine, type Recording };
