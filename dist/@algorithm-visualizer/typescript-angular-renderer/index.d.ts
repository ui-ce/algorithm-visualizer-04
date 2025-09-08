import * as i0 from '@angular/core';
import { OnDestroy, EventEmitter, AfterViewInit, OnChanges, ElementRef, SimpleChanges } from '@angular/core';
import cytoscape, { CircleLayoutOptions, ConcentricLayoutOptions, BreadthFirstLayoutOptions, LayoutOptions } from 'cytoscape';

declare class WebPlayer implements OnDestroy {
    animationLength: number;
    frameIndex: number;
    frameTime: number;
    frameIndexChange: EventEmitter<number>;
    protected playing: boolean;
    private _timer;
    ngOnDestroy(): void;
    play(): void;
    stop(): void;
    togglePlay(): void;
    next(): void;
    prev(): void;
    first(): void;
    last(): void;
    protected onFrameTimeChanged(frameTime: number): void;
    protected onFrameIndexChanged(frameIndex: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WebPlayer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WebPlayer, "web-player", never, { "animationLength": { "alias": "animationLength"; "required": false; }; "frameIndex": { "alias": "frameIndex"; "required": false; }; "frameTime": { "alias": "frameTime"; "required": false; }; }, { "frameIndexChange": "frameIndexChange"; }, never, never, true, never>;
}

type Array2dCellState = {
    value: string;
    highlightTags: string[];
};

type Array2dState = {
    name: string;
    values: Array2dCellState[][];
};

type Array2DHighlightTag = {
    tag: string;
    color: string;
};

type Array2DMetaData = {
    defaultColor?: string;
    highlightTags?: Array2DHighlightTag[];
    minHeight?: string;
    cellSize?: string;
};

declare class Array2DRenderer {
    state: Array2dState;
    metadata: Array2DMetaData;
    getMinHeight(): string;
    getDefaultColor(): string;
    getCellSize(): string;
    getCellColors(cell: {
        value: string;
        highlightTags: string[];
    }): string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<Array2DRenderer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Array2DRenderer, "array-2d-renderer", never, { "state": { "alias": "state"; "required": false; }; "metadata": { "alias": "metadata"; "required": false; }; }, {}, never, never, true, never>;
}

declare class Array2DHighlightLayer {
    colors: string[];
    value: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<Array2DHighlightLayer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Array2DHighlightLayer, "array-2d-highlight-layer", never, { "colors": { "alias": "colors"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, {}, never, never, true, never>;
}

declare class ChartHighlightLayer {
    colors: string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<ChartHighlightLayer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChartHighlightLayer, "chart-highlight-layer", never, { "colors": { "alias": "colors"; "required": false; }; }, {}, never, never, true, never>;
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

type ChartHighlightTag = {
    tag: string;
    color: string;
};

type ChartMetaData = {
    defaultColor?: string;
    highlightTags?: ChartHighlightTag[];
    barWidth?: string;
    barGap?: string;
    chartHeight?: string;
    showLabel?: boolean;
    showValue?: boolean;
};

declare class ChartRenderer {
    state: ChartState;
    metadata: ChartMetaData;
    protected getBarColors(highlightTags: string[]): string[];
    protected getBarHeight(value: number): string;
    protected getDefaultColor(): string;
    protected getBarWidth(): string;
    protected getBarGap(): string;
    protected getChartHeight(): string;
    protected getShowLabel(): boolean;
    protected getShowValue(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChartRenderer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChartRenderer, "chart-renderer", never, { "state": { "alias": "state"; "required": false; }; "metadata": { "alias": "metadata"; "required": false; }; }, {}, never, never, true, never>;
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
    minHeight?: string;
};

declare class GraphRenderer implements AfterViewInit, OnChanges, OnDestroy {
    state: GraphState;
    metadata: GraphMetaData;
    protected cyContainer: ElementRef<HTMLDivElement>;
    protected readonly circleLayout: CircleLayoutOptions;
    protected readonly concentricLayout: ConcentricLayoutOptions;
    protected readonly breadthFirstLayout: BreadthFirstLayoutOptions;
    protected readonly layoutOptions: ({
        label: string;
        value: cytoscape.CircleLayoutOptions;
    } | {
        label: string;
        value: cytoscape.ConcentricLayoutOptions;
    } | {
        label: string;
        value: cytoscape.BreadthFirstLayoutOptions;
    })[];
    private _currentLayout;
    private _isInitialized;
    private _cy;
    get minHeight(): string;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    changeLayout(layout: LayoutOptions): void;
    private renderGraph;
    static ɵfac: i0.ɵɵFactoryDeclaration<GraphRenderer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GraphRenderer, "graph-renderer", never, { "state": { "alias": "state"; "required": false; }; "metadata": { "alias": "metadata"; "required": false; }; }, {}, never, never, true, never>;
}

type LogState = {
    name: string;
    message: string;
};

type LogMetaData = {
    defaultColor?: string;
    minHeight?: string;
};

declare class LogRenderer {
    state: LogState;
    metadata: LogMetaData;
    getMinHeight(): string;
    getColor(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<LogRenderer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LogRenderer, "log-renderer", never, { "state": { "alias": "state"; "required": false; }; "metadata": { "alias": "metadata"; "required": false; }; }, {}, never, never, true, never>;
}

type FrameState<T = unknown> = {
    id: string;
    type: string;
    state: T;
};

type Frame = FrameState[];

type Animation = Frame[];

type ObjectMetadataEntryBase = {
    id?: string;
    type: string;
};

type Array2DMetadataEntry = ObjectMetadataEntryBase & {
    type: 'Array2D';
    metadata: Array2DMetaData;
};

type ChartMetadataEntry = ObjectMetadataEntryBase & {
    type: 'Chart';
    metadata: ChartMetaData;
};

type GraphMetadataEntry = ObjectMetadataEntryBase & {
    type: 'Graph';
    metadata: GraphMetaData;
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
    objectMetaData?: ObjectMetaDataEntry[];
};

declare class WebRenderer {
    animation: Animation;
    rendererMetadata: RendererMetadata;
    frameIndex: number;
    hasPlayer: boolean;
    get currentFrame(): Frame | null;
    protected getDocumentName(): string;
    protected onFrameIndexChange(frameIndex: number): void;
    protected convertToGraphState(state: unknown): GraphState;
    protected convertToChartState(state: unknown): ChartState;
    protected convertToArray2dState(state: unknown): Array2dState;
    protected convertToLogState(state: unknown): LogState;
    protected getMetaData(type: string, id: string): ObjectMetadata;
    protected convertToGraphMetadata(metadata: ObjectMetadata): GraphMetaData;
    protected convertToChartMetaData(metadata: ObjectMetadata): ChartMetaData;
    protected convertToArray2DMetaData(metadata: ObjectMetadata): Array2DMetaData;
    protected convertToLogMetaData(metadata: ObjectMetadata): LogMetaData;
    static ɵfac: i0.ɵɵFactoryDeclaration<WebRenderer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WebRenderer, "web-renderer", never, { "animation": { "alias": "animation"; "required": false; }; "rendererMetadata": { "alias": "rendererMetadata"; "required": false; }; "frameIndex": { "alias": "frameIndex"; "required": false; }; "hasPlayer": { "alias": "hasPlayer"; "required": false; }; }, {}, never, never, true, never>;
}

export { Array2DHighlightLayer, Array2DRenderer, ChartHighlightLayer, ChartRenderer, GraphRenderer, LogRenderer, WebPlayer, WebRenderer };
export type { Animation, Array2DHighlightTag, Array2DMetaData, Array2DMetadataEntry, Array2dCellState, Array2dState, ChartBarState, ChartHighlightTag, ChartMetaData, ChartMetadataEntry, ChartState, Frame, FrameState, GraphEdgeState, GraphHighlightTag, GraphMetaData, GraphMetadataEntry, GraphNodeState, GraphState, IRenderer, LogMetaData, LogMetadataEntry, LogState, ObjectMetaDataEntry, ObjectMetadata, ObjectMetadataEntryBase, RendererMetadata };
