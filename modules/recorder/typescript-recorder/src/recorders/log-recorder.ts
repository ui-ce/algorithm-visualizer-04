import { Recorder } from './recorder';
import { RecorderEngine } from './recorder-engine';
import { LogAction } from '../models/log/log-action.enum';
import { LogSetMessageParams } from '../models/log/log-set-message-params.type';
import { LogClearMessageParams } from '../models/log/log-clear-message-params.type';
import { LogInitParams } from '../models/log/log-init-params.type';

export class LogRecorder extends Recorder {
  public constructor(recorderEngine: RecorderEngine, param: LogInitParams, id?: string) {
    super(recorderEngine, param, 'Log', id);
  }

  public setMessage(param: LogSetMessageParams): void {
    this.record(LogAction.SET_MESSAGE, param);
  }

  public clearMessage(param: LogClearMessageParams): void {
    this.record(LogAction.CLEAR_MESSAGE, param);
  }
}
