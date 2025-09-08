import { GraphMetaData } from './graph-metadata.type';
import { ObjectMetadataEntryBase } from '../object-metadata-entry-base.type';

export type GraphMetadataEntry = ObjectMetadataEntryBase & {
  type: 'Graph';
  metadata: GraphMetaData;
}