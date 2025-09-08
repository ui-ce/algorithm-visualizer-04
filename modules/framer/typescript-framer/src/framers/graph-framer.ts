import { IFramer } from '../models/framer/i-framer.interface';
import { FrameState } from '../models/framer/frame-state.type';
import { GraphAction } from '../models/recorder/graph/graph-action.enum';
import { GraphAddNodeParams } from '../models/recorder/graph/graph-add-node-params.type';
import { GraphRemoveNodeParams } from '../models/recorder/graph/graph-remove-node-params.type';
import { GraphAddEdgeParams } from '../models/recorder/graph/graph-add-edge-params.type';
import { GraphRemoveEdgeParams } from '../models/recorder/graph/graph-remove-edge-params.type';
import { GraphSetNodeHighlightParams } from '../models/recorder/graph/graph-set-node-highlight-params.type';
import { GraphClearNodeHighlightParams } from '../models/recorder/graph/graph-clear-node-highlight-params.type';
import { GraphSetEdgeHighlightParams } from '../models/recorder/graph/graph-set-edge-highlight-params.type';
import { GraphClearEdgeHighlightParams } from '../models/recorder/graph/graph-clear-edge-highlight-params.type';
import { GraphState } from '../models/framer/graph/graph-state.type';
import { GraphInitParams } from '../models/recorder/graph/graph-init-params.type';
import { GraphRemoveEdgesParams } from '../models/recorder/graph/graph-remove-edges-params.type';
import { GraphClearEdgesHighlightParams } from '../models/recorder/graph/graph-clear-edges-highlight-params.type';
import { GraphSetEdgesHighlightParams } from '../models/recorder/graph/graph-set-edges-highlight-params.type';
import {
  GraphClearAllEdgesHighlightParams
} from '../models/recorder/graph/graph-clear-all-edges-highlight-params.type';
import {
  GraphClearAllNodesHighlightParams
} from '../models/recorder/graph/graph-clear-all-nodes-highlight-params.type';

export class GraphFramer implements IFramer {
  private _id: string;
  private _graphState: GraphState;


  public initialize(id: string, param: GraphInitParams): void {
    this._id = id;
    this._graphState = {
      name: param.name,
      isDirected: param.isDirected,
      nodes: param.nodes.map(node => ({
        id: node.id,
        label: node.label ?? null,
        highlightTags: [],
      })),
      edges: param.edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label ?? null,
        highlightTags: [],
      })),
    };
  }

  public applyAction(action: string, param: unknown): void {
    switch (action) {
      case GraphAction.ADD_NODE:
        this.addNode(param as GraphAddNodeParams);
        break;
      case GraphAction.REMOVE_NODE:
        this.removeNode(param as GraphRemoveNodeParams);
        break;
      case GraphAction.ADD_EDGE:
        this.addEdge(param as GraphAddEdgeParams);
        break;
      case GraphAction.REMOVE_EDGE:
        this.removeEdge(param as GraphRemoveEdgeParams);
        break;
      case GraphAction.REMOVE_EDGES:
        this.removeEdges(param as GraphRemoveEdgesParams);
        break;
      case GraphAction.SET_NODE_HIGHLIGHT:
        this.setNodeHighlight(param as GraphSetNodeHighlightParams);
        break;
      case GraphAction.CLEAR_NODE_HIGHLIGHT:
        this.clearNodeHighlight(param as GraphClearNodeHighlightParams);
        break;
      case GraphAction.CLEAR_ALL_NODES_HIGHLIGHT:
        this.clearAllNodesHighlight(param as GraphClearAllNodesHighlightParams);
        break;
      case GraphAction.SET_EDGE_HIGHLIGHT:
        this.setEdgeHighlight(param as GraphSetEdgeHighlightParams);
        break;
      case GraphAction.SET_EDGES_HIGHLIGHT:
        this.setEdgesHighlight(param as GraphSetEdgesHighlightParams);
        break;
      case GraphAction.CLEAR_EDGE_HIGHLIGHT:
        this.clearEdgeHighlight(param as GraphClearEdgeHighlightParams);
        break;
      case GraphAction.CLEAR_EDGES_HIGHLIGHT:
        this.clearEdgesHighlight(param as GraphClearEdgesHighlightParams);
        break;
      case GraphAction.CLEAR_ALL_EDGES_HIGHLIGHT:
        this.clearAllEdgesHighlight(param as GraphClearAllEdgesHighlightParams);
        break;
      default:
        throw new Error(`Unknown GraphAction: ${action}`);
    }
  }

  private addNode(param: GraphAddNodeParams): void {
    if (!this._graphState.nodes.find((n) => n.id === param.id)) {
      this._graphState.nodes.push({
        id: param.id,
        label: param.label ?? null,
        highlightTags: [],
      });
    }
  }

  private removeNode(param: GraphRemoveNodeParams): void {
    this._graphState.nodes = this._graphState.nodes.filter((n) => n.id !== param.id);
    this._graphState.edges = this._graphState.edges.filter(
      (e) => e.source !== param.id && e.target !== param.id
    );
  }

  private addEdge(param: GraphAddEdgeParams): void {
    const sourceExists = this._graphState.nodes.some((n) => n.id === param.source);
    const targetExists = this._graphState.nodes.some((n) => n.id === param.target);
    const edgeExists = this._graphState.edges.some((e) => e.id === param.id);

    if (sourceExists && targetExists && !edgeExists) {
      this._graphState.edges.push({
        id: param.id,
        source: param.source,
        target: param.target,
        label: param.label ?? null,
        highlightTags: [],
      });
    }
  }

  private removeEdge(param: GraphRemoveEdgeParams): void {
    this._graphState.edges = this._graphState.edges.filter((e) => e.id !== param.id);
  }

  private removeEdges(param: GraphRemoveEdgesParams): void {
    const { source, target } = param;

    this._graphState.edges = this._graphState.edges.filter(e => {
      if (this._graphState.isDirected) {
        // Keep edges that do NOT match the given source/target
        return !(e.source === source && e.target === target);
      } else {
        // For undirected, keep edges that match neither direction
        return !(
          (e.source === source && e.target === target) ||
          (e.source === target && e.target === source)
        );
      }
    });
  }

  private setNodeHighlight(param: GraphSetNodeHighlightParams): void {
    const node = this._graphState.nodes.find((n) => n.id === param.id);
    if (node) {
      node.highlightTags = Array.from(new Set([...node.highlightTags, ...param.highlightTags]));
    }
  }

  private clearNodeHighlight(param: GraphClearNodeHighlightParams): void {
    const node = this._graphState.nodes.find((n) => n.id === param.id);
    if (node) {
      node.highlightTags = [];
    }
  }

  private clearAllNodesHighlight(param: GraphClearAllNodesHighlightParams): void {
    this._graphState.nodes.forEach(node => node.highlightTags = []);
  }

  private setEdgeHighlight(param: GraphSetEdgeHighlightParams): void {
    const edge = this._graphState.edges.find((e) => e.id === param.id);
    if (edge) {
      edge.highlightTags = param.highlightTags;
    }
  }

  private setEdgesHighlight(param: GraphSetEdgesHighlightParams): void {
    const { source, target, highlightTags } = param;

    this._graphState.edges.forEach(e => {
      const matches = this._graphState.isDirected
        ? e.source === source && e.target === target
        : (e.source === source && e.target === target) || (e.source === target && e.target === source);

      if (matches) {
        e.highlightTags = highlightTags;
      }
    });
  }

  private clearEdgeHighlight(param: GraphClearEdgeHighlightParams): void {
    const edge = this._graphState.edges.find((e) => e.id === param.id);
    if (edge) {
      edge.highlightTags = [];
    }
  }

  private clearEdgesHighlight(param: GraphClearEdgesHighlightParams): void {
    const { source, target } = param;

    this._graphState.edges.forEach(e => {
      const matches = this._graphState.isDirected
        ? e.source === source && e.target === target
        : (e.source === source && e.target === target) || (e.source === target && e.target === source);

      if (matches) {
        e.highlightTags = [];
      }
    });
  }

  private clearAllEdgesHighlight(param: GraphClearAllEdgesHighlightParams): void {
    this._graphState.edges.forEach(e => e.highlightTags = []);
  }

  public getFrameState(): FrameState<GraphState> {
    return {
      id: this._id,
      type: 'Graph',
      state: this._graphState
    };
  }
}
