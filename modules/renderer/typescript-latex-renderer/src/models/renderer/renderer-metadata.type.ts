import { ObjectMetaDataEntry } from './object-metadata-entry.type';

export type RendererMetadata = {
  documentName?: string;
  showLine?: boolean;
  objectMetaData?: ObjectMetaDataEntry[];
}