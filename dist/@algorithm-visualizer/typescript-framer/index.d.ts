type FrameState<T = unknown> = {
    id: string;
    type: string;
    state: T;
};

interface IFramer {
    initialize(id: string, param: unknown): void;
    applyAction(action: string, param: unknown): void;
    getFrameState(): FrameState;
}

type Array2DInitParams = {
    name: string;
    values: string[][];
};

type Array2dCellState = {
    value: string;
    highlightTags: string[];
};

type Array2dState = {
    name: string;
    values: Array2dCellState[][];
};

declare class Array2DFramer implements IFramer {
    private _id;
    private _array2D;
    initialize(id: string, param: Array2DInitParams): void;
    applyAction(action: string, param: unknown): void;
    private setCells;
    private insertCells;
    private removeCells;
    private pushCells;
    private popCells;
    private shiftCells;
    private unshiftCells;
    private insertRows;
    private pushRows;
    private popRows;
    private shiftRows;
    private unshiftRows;
    private setCellsHighlight;
    private clearCellsHighlight;
    private clearAllCellsHighlight;
    private clearAllRowsHighlight;
    getFrameState(): FrameState<Array2dState>;
}

type ChartBarState = {
    value: number;
    label: string;
    highlightTags: string[];
};

type ChartState = {
    name: string;
    bars: ChartBarState[];
};

type ChartEntry = {
    value: number;
    label?: string;
};

type ChartInitParams = {
    name: string;
    values: ChartEntry[];
};

declare class ChartFramer implements IFramer {
    private _id;
    private _chart;
    initialize(id: string, param: ChartInitParams): void;
    applyAction(action: string, param: unknown): void;
    private setCells;
    private insertCells;
    private removeCells;
    private pushCells;
    private popCells;
    private shiftCells;
    private unshiftCells;
    private setCellsHighlight;
    private clearCellsHighlight;
    getFrameState(): FrameState<ChartState>;
}

type Command = {
    id: string;
    type: string;
    action: string;
    params?: unknown;
};

type CommandGroup = Command[];

type Recording = CommandGroup[];

type Frame = FrameState[];

type Animation = Frame[];

declare class FramerEngine {
    private readonly framerClassMap;
    private framerInstanceMap;
    getAnimation(recording: Recording): Animation;
    private initializeFramer;
}

type GraphNodeState = {
    id: string;
    label: string;
    highlightTags: string[];
};

type GraphEdgeState = {
    id: string;
    source: string;
    target: string;
    label: string;
    highlightTags: string[];
};

type GraphState = {
    name: string;
    nodes: GraphNodeState[];
    edges: GraphEdgeState[];
    isDirected: boolean;
};

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

type GraphInitParams = {
    name: string;
    nodes: GraphAddNodeParams[];
    edges: GraphAddEdgeParams[];
    isDirected: boolean;
};

declare class GraphFramer implements IFramer {
    private _id;
    private _graphState;
    initialize(id: string, param: GraphInitParams): void;
    applyAction(action: string, param: unknown): void;
    private addNode;
    private removeNode;
    private addEdge;
    private removeEdge;
    private removeEdges;
    private setNodeHighlight;
    private clearNodeHighlight;
    private clearAllNodesHighlight;
    private setEdgeHighlight;
    private setEdgesHighlight;
    private clearEdgeHighlight;
    private clearEdgesHighlight;
    private clearAllEdgesHighlight;
    getFrameState(): FrameState<GraphState>;
}

type LogState = {
    name: string;
    message: string;
};

type LogInitParams = {
    name: string;
    message?: string;
};

declare class LogFramer implements IFramer {
    private _id;
    private _log;
    initialize(id: string, param: LogInitParams): void;
    applyAction(action: string, param: unknown): void;
    private setMessage;
    private clearMessage;
    getFrameState(): FrameState<LogState>;
}

type Array2dCell = {
    value: string;
    highlightTags: string[];
};

type Array2d = {
    name: string;
    values: Array2dCell[][];
};

type ChartBar = {
    value: number;
    label: string;
    highlightTags: string[];
};

type Chart = {
    name: string;
    bars: ChartBar[];
};

type GraphEdge = {
    id: string;
    source: string;
    target: string;
    label: string;
    highlightTags: string[];
};

type GraphNode = {
    id: string;
    label: string;
    highlightTags: string[];
};

type Graph = {
    name: string;
    nodes: GraphNode[];
    edges: GraphEdge[];
    isDirected: boolean;
};

type Log = {
    name: string;
    message: string;
};

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

type LogSetMessageParams = {
    message: string;
};

export { type Animation, Array2DAction, type Array2DClearAllCellsHighlightParams, type Array2DClearAllRowsHighlightParams, type Array2DClearCellsHighlightParams, Array2DFramer, type Array2DInitParams, type Array2DInsertCellsParams, type Array2DInsertRowsParams, type Array2DPopCellsParams, type Array2DPopRowParams, type Array2DPushCellsParams, type Array2DPushRowsParams, type Array2DRemoveCellsParams, type Array2DSetCellsHighlightParams, type Array2DSetCellsParams, type Array2DShiftCellsParams, type Array2DShiftRowsParams, type Array2DUnshiftCellsParams, type Array2DUnshiftRowsParams, type Array2d, type Array2dCell, type Array2dCellState, type Array2dState, type Chart, ChartAction, type ChartBar, type ChartBarState, type ChartClearCellsHighlightParams, type ChartEntry, ChartFramer, type ChartInitParams, type ChartInsertCellsParams, type ChartPopCellsParams, type ChartPushCellsParams, type ChartRemoveCellsParams, type ChartSetCellsHighlightParams, type ChartSetCellsParams, type ChartShiftCellsParams, type ChartState, type ChartUnshiftCellsParams, type Command, type CommandGroup, type Frame, type FrameState, FramerEngine, type Graph, GraphAction, type GraphAddEdgeParams, type GraphAddNodeParams, type GraphClearAllEdgesHighlightParams, type GraphClearAllNodesHighlightParams, type GraphClearEdgeHighlightParams, type GraphClearEdgesHighlightParams, type GraphClearNodeHighlightParams, type GraphEdge, type GraphEdgeState, GraphFramer, type GraphInitParams, type GraphNode, type GraphNodeState, type GraphRemoveEdgeParams, type GraphRemoveEdgesParams, type GraphRemoveNodeParams, type GraphSetEdgeHighlightParams, type GraphSetEdgesHighlightParams, type GraphSetNodeHighlightParams, type GraphState, type IFramer, type Log, LogAction, type LogClearMessageParams, LogFramer, type LogInitParams, type LogSetMessageParams, type LogState, type Recording };
