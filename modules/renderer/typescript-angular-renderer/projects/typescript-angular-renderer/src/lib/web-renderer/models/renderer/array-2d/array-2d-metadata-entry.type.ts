import { Array2DMetaData } from './array-2d-metadata.type';
import { ObjectMetadataEntryBase } from '../object-metadata-entry-base.type';

export type Array2DMetadataEntry = ObjectMetadataEntryBase & {
  type: 'Array2D';
  metadata: Array2DMetaData;
}