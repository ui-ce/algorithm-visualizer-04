import { ChartMetaData } from './chart/chart-metadata.type';
import { GraphMetaData } from './graph/graph-metadata.type';
import { Array2DMetaData } from './array-2d/array-2d-metadata.type';
import { LogMetaData } from './log/log-metadata.type';

export type ObjectMetadata = ChartMetaData | GraphMetaData | Array2DMetaData | LogMetaData;