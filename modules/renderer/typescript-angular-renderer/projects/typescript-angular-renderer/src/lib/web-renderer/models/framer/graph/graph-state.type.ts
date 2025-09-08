import { GraphNodeState } from './graph-node-state.type';
import { GraphEdgeState } from './graph-edge-state.type';

export type GraphState = {
  name: string;
  nodes: GraphNodeState[];
  edges: GraphEdgeState[];
}