import { ObjectMetadata } from './object-metadata.type';

export interface IRenderer {
  render(state: unknown, metadata?: ObjectMetadata): string
}
