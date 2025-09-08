import { LogMetaData } from './log-metadata.type';
import { ObjectMetadataEntryBase } from '../object-metadata-entry-base.type';

export type LogMetadataEntry = ObjectMetadataEntryBase & {
  type: 'Log';
  metadata: LogMetaData;
}