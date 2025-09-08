import { GraphAddEdgeParams } from './graph-add-edge-params.type';
import { GraphAddNodeParams } from './graph-add-node-params.type';

export type GraphInitParams = {
  name: string;
  nodes: GraphAddNodeParams[];
  edges: GraphAddEdgeParams[]
  isDirected: boolean;
};