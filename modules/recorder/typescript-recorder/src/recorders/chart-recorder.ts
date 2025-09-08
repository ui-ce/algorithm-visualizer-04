import { Recorder } from './recorder';
import { RecorderEngine } from './recorder-engine';
import { ChartInitParams } from '../models/chart/chart-init-params.type';
import { ChartSetCellsParams } from '../models/chart/chart-set-cells-params.type';
import { ChartAction } from '../models/chart/chart-action.enum';
import { ChartInsertCellsParams } from '../models/chart/chart-insert-cells-params.type';
import { ChartPushCellsParams } from '../models/chart/chart-push-cells-params.type';
import { ChartPopCellsParams } from '../models/chart/chart-pop-cells-params.type';
import { ChartShiftCellsParams } from '../models/chart/chart-shift-cells-params.type';
import { ChartUnshiftCellsParams } from '../models/chart/chart-unshift-cells-params.type';
import { ChartSetCellsHighlightParams } from '../models/chart/chart-set-cells-highlight-params.type';
import { ChartClearCellsHighlightParams } from '../models/chart/chart-clear-cells-highlight-params.type';
import { ChartRemoveCellsParams } from '../models/chart/chart-remove-cells-params.type';

export class ChartRecorder extends Recorder {
  public constructor(recorderEngine: RecorderEngine, param: ChartInitParams, id?: string) {
    super(recorderEngine, param, 'Chart', id);
  }

  public setCells(param: ChartSetCellsParams): void {
    this.record(ChartAction.SET_CELLS, param);
  }

  public insertCells(param: ChartInsertCellsParams): void {
    this.record(ChartAction.INSERT_CELLS, param);
  }

  public removeCells(param: ChartRemoveCellsParams): void {
    this.record(ChartAction.REMOVE_CELLS, param);
  }

  public pushCells(param: ChartPushCellsParams): void {
    this.record(ChartAction.PUSH_CELLS, param);
  }

  public popCells(param: ChartPopCellsParams): void {
    this.record(ChartAction.POP_CELLS, param);
  }

  public shiftCells(param: ChartShiftCellsParams): void {
    this.record(ChartAction.SHIFT_CELLS, param);
  }

  public unshiftCells(param: ChartUnshiftCellsParams): void {
    this.record(ChartAction.UNSHIFT_CELLS, param);
  }

  public setCellsHighlight(param: ChartSetCellsHighlightParams): void {
    this.record(ChartAction.SET_CELLS_HIGHLIGHT, param);
  }

  public clearCellsHighlight(param: ChartClearCellsHighlightParams): void {
    this.record(ChartAction.CLEAR_CELLS_HIGHLIGHT, param);
  }
}
