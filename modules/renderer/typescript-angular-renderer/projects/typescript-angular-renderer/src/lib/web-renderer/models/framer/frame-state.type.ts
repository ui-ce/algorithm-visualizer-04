export type FrameState<T = unknown> = {
  id: string;
  type: string;
  state: T
}