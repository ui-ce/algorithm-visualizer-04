import { ChartHighlightTag } from './chart-highlight-tag.type';

export type ChartMetaData = {
  defaultColor?: string;
  highlightTags?: ChartHighlightTag[];
  barWidth?: number;
  barGap?: number;
  chartHeight?: number;
  showLabel?: boolean;
  showValue?: boolean;
  alignName?: 'left' | 'center' | 'right';
}