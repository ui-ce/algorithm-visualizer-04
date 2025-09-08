import { ChartMetaData } from './chart-metadata.type';
import { ObjectMetadataEntryBase } from '../object-metadata-entry-base.type';

export type ChartMetadataEntry = ObjectMetadataEntryBase & {
  type: 'Chart';
  metadata: ChartMetaData;
}