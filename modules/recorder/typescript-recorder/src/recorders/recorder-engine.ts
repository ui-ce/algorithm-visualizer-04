import { Command } from '../models/command.type';
import { Recording } from '../models/recording.type';

export class RecorderEngine {
  private readonly _commands: Recording = [];
  private _queuedRecordFunctions: Function[] = [];
  private _isGrouping: boolean = false;

  public record(command: Command): void {
    if (!this._isGrouping) {
      this._isGrouping = true;
      this.internalBeginGroup();
      this._isGrouping = false;
    }

    this._commands[this._commands.length - 1].push(command);
  }

  public beginGroup(): void {
    this._isGrouping = true;
    this.internalBeginGroup();
  }

  public endGroup(): void {
    this._isGrouping = false;
  }

  public queue(recordFunction: Function): void {
    this._queuedRecordFunctions.push(recordFunction);
  }

  public getRecording(): Recording {
    return this._commands;
  }

  public internalBeginGroup(): void {
    this._commands.push([]);
    this._queuedRecordFunctions.forEach((recordFunction) => recordFunction());
    this._queuedRecordFunctions = [];
  }
}
