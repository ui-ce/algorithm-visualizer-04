type FrameState<T = unknown> = {
    id: string;
    type: string;
    state: T;
};

type Frame = FrameState[];

type Animation = Frame[];

type Array2dCellState = {
    value: string;
    highlightTags: string[];
};

type Array2dState = {
    name: string;
    values: Array2dCellState[][];
};

type ChartBarState = {
    value: number;
    label: string;
    highlightTags: string[];
};

type ChartState = {
    name: string;
    bars: ChartBarState[];
};

type GraphEdgeState = {
    id: string;
    source: string;
    target: string;
    label: string;
    highlightTags: string[];
};

type GraphNodeState = {
    id: string;
    label: string;
    highlightTags: string[];
};

type GraphState = {
    name: string;
    nodes: GraphNodeState[];
    edges: GraphEdgeState[];
};

type LogState = {
    name: string;
    message: string;
};

type Array2DHighlightTag = {
    tag: string;
    color: string;
};

type Array2DMetaData = {
    defaultColor?: string;
    highlightTags?: Array2DHighlightTag[];
    minHeight?: number;
    alignName?: 'left' | 'center' | 'right';
};

type ObjectMetadataEntryBase = {
    id?: string;
    type: string;
};

type Array2DMetadataEntry = ObjectMetadataEntryBase & {
    type: 'Array2D';
    metadata: Array2DMetaData;
};

type ChartHighlightTag = {
    tag: string;
    color: string;
};

type ChartMetaData = {
    defaultColor?: string;
    highlightTags?: ChartHighlightTag[];
    barWidth?: number;
    barGap?: number;
    chartHeight?: number;
    showLabel?: boolean;
    showValue?: boolean;
    alignName?: 'left' | 'center' | 'right';
};

type ChartMetadataEntry = ObjectMetadataEntryBase & {
    type: 'Chart';
    metadata: ChartMetaData;
};

type GraphHighlightTag = {
    tag: string;
    color: string;
};

type GraphMetaData = {
    defaultNodeColor?: string;
    defaultEdgeColor?: string;
    nodeHighlightTags?: GraphHighlightTag[];
    edgeHighlightTags?: GraphHighlightTag[];
    minHeight?: number;
    alignName?: 'left' | 'center' | 'right';
};

type GraphMetadataEntry = ObjectMetadataEntryBase & {
    type: 'Graph';
    metadata: GraphMetaData;
};

type LogMetaData = {
    defaultColor?: string;
    minHeight?: number;
    alignName?: 'left' | 'center' | 'right';
};

type ObjectMetadata = ChartMetaData | GraphMetaData | Array2DMetaData | LogMetaData;

interface IRenderer {
    render(state: unknown, metadata?: ObjectMetadata): string;
}

type LogMetadataEntry = ObjectMetadataEntryBase & {
    type: 'Log';
    metadata: LogMetaData;
};

type ObjectMetaDataEntry = ChartMetadataEntry | GraphMetadataEntry | Array2DMetadataEntry | LogMetadataEntry;

type RendererMetadata = {
    documentName?: string;
    showLine?: boolean;
    objectMetaData?: ObjectMetaDataEntry[];
};

declare class Array2DRenderer implements IRenderer {
    render(state: Array2dState, metadata?: Array2DMetaData): string;
}

declare class ChartRenderer implements IRenderer {
    render(state: ChartState, metadata?: ChartMetaData): string;
}

declare class GraphRenderer implements IRenderer {
    render(state: GraphState, metadata?: GraphMetaData): string;
}

declare class LogRenderer implements IRenderer {
    render(state: LogState, metadata?: LogMetaData): string;
}

declare class RendererEngine {
    private readonly renderersMap;
    render(animation: Animation, rendererMetadata: RendererMetadata): string;
}

export { type Animation, type Array2DHighlightTag, type Array2DMetaData, type Array2DMetadataEntry, Array2DRenderer, type Array2dCellState, type Array2dState, type ChartBarState, type ChartHighlightTag, type ChartMetaData, type ChartMetadataEntry, ChartRenderer, type ChartState, type Frame, type FrameState, type GraphEdgeState, type GraphHighlightTag, type GraphMetaData, type GraphMetadataEntry, type GraphNodeState, GraphRenderer, type GraphState, type IRenderer, type LogMetaData, type LogMetadataEntry, LogRenderer, type LogState, type ObjectMetaDataEntry, type ObjectMetadata, type ObjectMetadataEntryBase, RendererEngine, type RendererMetadata };
