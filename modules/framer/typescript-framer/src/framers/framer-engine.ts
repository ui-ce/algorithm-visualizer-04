import { IFramer } from '../models/framer/i-framer.interface';
import { Recording } from '../models/recorder/recording.type';
import { Animation } from '../models/framer/animation.type';
import { GraphFramer } from './graph-framer';
import { Array2DFramer } from './array-2d-framer';
import { ChartFramer } from './chart-framer';
import { LogFramer } from './log-framer';

export class FramerEngine {
  private readonly framerClassMap: Map<string, new () => IFramer> = new Map<string, new () => IFramer>([
    ['Graph', GraphFramer],
    ['Array2D', Array2DFramer],
    ['Chart', ChartFramer],
    ['Log', LogFramer]
  ]);
  private framerInstanceMap: Map<string, IFramer> = new Map();

  public getAnimation(recording: Recording): Animation {
    const animation: Animation = [];

    for (const commandGroup of recording) {
      for (const command of commandGroup) {
        const { id, type, action, params } = command;

        if (action === 'Init') {
          this.initializeFramer(id, type, params);
          continue;
        }

        if (action === 'Destroy') {
          this.framerInstanceMap.delete(id);
          continue;
        }

        const framerInstance = this.framerInstanceMap.get(id)!;

        if (!framerInstance) {
          throw new Error(`No framer has been initialized for type: ${type}, id: ${id}`);
        }

        framerInstance.applyAction(action, params);
      }

      if (this.framerInstanceMap.size === 0) {
        continue;
      }

      animation.push(Array.from(this.framerInstanceMap.values()).map((framerInstance) => structuredClone(framerInstance.getFrameState())));
    }

    return animation;
  }

  private initializeFramer(id: string, type: string, params: unknown): void {
    const framerClass = this.framerClassMap.get(type);

    if (!framerClass) {
      throw new Error(`No framer registered for type: ${type}`);
    }

    const framerInstance = new framerClass();
    framerInstance.initialize(id, params);
    this.framerInstanceMap.set(id, framerInstance);
  }
}
