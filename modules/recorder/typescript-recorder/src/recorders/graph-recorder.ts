import { Recorder } from './recorder';
import { RecorderEngine } from './recorder-engine';
import { GraphAction } from '../models/graph/graph-action.enum';
import { GraphAddNodeParams } from '../models/graph/graph-add-node-params.type';
import { GraphRemoveNodeParams } from '../models/graph/graph-remove-node-params.type';
import { GraphAddEdgeParams } from '../models/graph/graph-add-edge-params.type';
import { GraphRemoveEdgeParams } from '../models/graph/graph-remove-edge-params.type';
import { GraphRemoveEdgesParams } from '../models/graph/graph-remove-edges-params.type';
import { GraphSetNodeHighlightParams } from '../models/graph/graph-set-node-highlight-params.type';
import { GraphClearNodeHighlightParams } from '../models/graph/graph-clear-node-highlight-params.type';
import { GraphSetEdgeHighlightParams } from '../models/graph/graph-set-edge-highlight-params.type';
import { GraphSetEdgesHighlightParams } from '../models/graph/graph-set-edges-highlight-params.type';
import { GraphClearEdgeHighlightParams } from '../models/graph/graph-clear-edge-highlight-params.type';
import { GraphClearEdgesHighlightParams } from '../models/graph/graph-clear-edges-highlight-params.type';
import { GraphInitParams } from '../models/graph/graph-init-params.type';
import { GraphClearAllEdgesHighlightParams } from '../models/graph/graph-clear-all-edges-highlight-params.type';
import { GraphClearAllNodesHighlightParams } from '../models/graph/graph-clear-all-nodes-highlight-params.type';

export class GraphRecorder extends Recorder {
  constructor(recorderEngine: RecorderEngine, param: GraphInitParams, id?: string) {
    super(recorderEngine, param, 'Graph', id);
  }

  public addNode(param: GraphAddNodeParams): void {
    this.record(GraphAction.ADD_NODE, param);
  }

  public removeNode(param: GraphRemoveNodeParams): void {
    this.record(GraphAction.REMOVE_NODE, param);
  }

  public addEdge(param: GraphAddEdgeParams): void {
    this.record(GraphAction.ADD_EDGE, param);
  }

  public removeEdge(param: GraphRemoveEdgeParams): void {
    this.record(GraphAction.REMOVE_EDGE, param);
  }

  public removeEdges(param: GraphRemoveEdgesParams): void {
    this.record(GraphAction.REMOVE_EDGES, param);
  }

  public setNodeHighlight(param: GraphSetNodeHighlightParams): void {
    this.record(GraphAction.SET_NODE_HIGHLIGHT, param);
  }

  public clearNodeHighlight(param: GraphClearNodeHighlightParams): void {
    this.record(GraphAction.CLEAR_NODE_HIGHLIGHT, param);
  }

  public clearAllNodesHighlight(param: GraphClearAllNodesHighlightParams): void {
    this.record(GraphAction.CLEAR_ALL_NODES_HIGHLIGHT, param);
  }

  public setEdgeHighlight(param: GraphSetEdgeHighlightParams): void {
    this.record(GraphAction.SET_EDGE_HIGHLIGHT, param);
  }

  public setEdgesHighlight(param: GraphSetEdgesHighlightParams): void {
    this.record(GraphAction.SET_EDGES_HIGHLIGHT, param);
  }

  public clearEdgeHighlight(param: GraphClearEdgeHighlightParams): void {
    this.record(GraphAction.CLEAR_EDGE_HIGHLIGHT, param);
  }

  public clearEdgesHighlight(param: GraphClearEdgesHighlightParams): void {
    this.record(GraphAction.CLEAR_EDGES_HIGHLIGHT, param);
  }

  public clearAllEdgesHighlight(param: GraphClearAllEdgesHighlightParams): void {
    this.record(GraphAction.CLEAR_ALL_EDGES_HIGHLIGHT, param);
  }
}
