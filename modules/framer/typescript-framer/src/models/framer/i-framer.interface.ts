import { FrameState } from './frame-state.type';

export interface IFramer {
  initialize(id: string, param: unknown): void;
  applyAction(action: string, param: unknown): void;
  getFrameState(): FrameState;
}