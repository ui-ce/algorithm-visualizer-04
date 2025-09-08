import { RecorderEngine } from './recorder-engine';
import { Command } from '../models/command.type';

export abstract class Recorder {
  private _isDestroyed: boolean = false;

  protected constructor(
    private readonly _recorderEngine: RecorderEngine,
    private readonly _param: unknown,
    private readonly _type: string,
    private readonly _id: string = crypto.randomUUID(),
  ) {
    this.record('Init', this._param);
  }

  protected record(action: string, params: unknown = {}): void {
    if (this._isDestroyed) {
      return;
    }

    const command: Command = {
      id: this._id,
      type: this._type,
      action,
      params: structuredClone(params),
    };
    this._recorderEngine.record(command);
  }

  public destroy(): void {
    this.record('Destroy');
    this._isDestroyed = true;
  }
}
