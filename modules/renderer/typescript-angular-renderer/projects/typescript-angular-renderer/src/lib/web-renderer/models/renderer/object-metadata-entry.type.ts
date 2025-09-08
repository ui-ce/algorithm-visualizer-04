import { ChartMetadataEntry } from './chart/chart-metadata-entry.type';
import { GraphMetadataEntry } from './graph/graph-metadata-entry.type';
import { Array2DMetadataEntry } from './array-2d/array-2d-metadata-entry.type';
import { LogMetadataEntry } from './log/log-metadata-entry.type';

export type ObjectMetaDataEntry = ChartMetadataEntry | GraphMetadataEntry | Array2DMetadataEntry | LogMetadataEntry;