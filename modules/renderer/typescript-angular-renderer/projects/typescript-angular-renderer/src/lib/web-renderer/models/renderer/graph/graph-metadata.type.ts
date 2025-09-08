import { GraphHighlightTag } from './graph-highlight-tag.type';

export type GraphMetaData = {
  defaultNodeColor?: string;
  defaultEdgeColor?: string;
  nodeHighlightTags?: GraphHighlightTag[];
  edgeHighlightTags?: GraphHighlightTag[];
  minHeight?: string;
};
