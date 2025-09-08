import { ChartHighlightTag } from './chart-highlight-tag.type';

export type ChartMetaData = {
  defaultColor?: string;
  highlightTags?: ChartHighlightTag[];
  barWidth?: string;
  barGap?: string;
  chartHeight?: string;
  showLabel?: boolean;
  showValue?: boolean;
};
