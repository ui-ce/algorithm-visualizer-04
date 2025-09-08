import { GraphNode } from './graph-node.type';
import { GraphEdge } from './graph-edge.type';

export type Graph = {
  name: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  isDirected: boolean;
};
