import { Recorder } from './recorder';
import { RecorderEngine } from './recorder-engine';
import { Array2DInitParams } from '../models/array-2d/array-2d-init-params.type';
import { Array2DSetCellsParams } from '../models/array-2d/array-2d-set-cells-params.type';
import { Array2DAction } from '../models/array-2d/array-2d-action.enum';
import { Array2DInsertCellsParams } from '../models/array-2d/array-2d-insert-cells-params.type';
import { Array2DPushCellsParams } from '../models/array-2d/array-2d-push-cells-params.type';
import { Array2DPopCellsParams } from '../models/array-2d/array-2d-pop-cells-params.type';
import { Array2DRemoveCellsParams } from '../models/array-2d/array-2d-remove-cells-params.type';
import { Array2DInsertRowsParams } from '../models/array-2d/array-2d-insert-rows-params.type';
import { Array2DPushRowsParams } from '../models/array-2d/array-2d-push-rows-params.type';
import { Array2DPopRowParams } from '../models/array-2d/array-2d-pop-row-params.type';
import { Array2DUnshiftRowsParams } from '../models/array-2d/array-2d-unshift-rows-params.type';
import { Array2DSetCellsHighlightParams } from '../models/array-2d/array-2d-set-cells-highlight-params.type';
import { Array2DClearCellsHighlightParams } from '../models/array-2d/array-2d-clear-cells-highlight-params.type';
import { Array2DShiftCellsParams } from '../models/array-2d/array-2d-shift-cells-params.type';
import { Array2DUnshiftCellsParams } from '../models/array-2d/array-2d-unshift-cells-params.type';
import { Array2DShiftRowsParams } from '../models/array-2d/array-2d-shift-rows-params.type';
import { Array2DClearAllCellsHighlightParams } from '../models/array-2d/array-2d-clear-all-cells-highlight-params.type';
import { Array2DClearAllRowsHighlightParams } from '../models/array-2d/array-2d-clear-all-rows-highlight-params.type';

export class Array2dRecorder extends Recorder {
  public constructor(recorderEngine: RecorderEngine, param: Array2DInitParams, id?: string) {
    super(recorderEngine, param, 'Array2D', id);
  }

  public setCells(param: Array2DSetCellsParams): void {
    this.record(Array2DAction.SET_CELLS, param);
  }

  public insertCells(param: Array2DInsertCellsParams): void {
    this.record(Array2DAction.INSERT_CELLS, param);
  }

  public removeCells(param: Array2DRemoveCellsParams): void {
    this.record(Array2DAction.REMOVE_CELLS, param);
  }

  public pushCells(param: Array2DPushCellsParams): void {
    this.record(Array2DAction.PUSH_CELLS, param);
  }

  public popCells(param: Array2DPopCellsParams): void {
    this.record(Array2DAction.POP_CELLS, param);
  }

  public shiftCells(param: Array2DShiftCellsParams): void {
    this.record(Array2DAction.SHIFT_CELLS, param);
  }

  public unshiftCells(param: Array2DUnshiftCellsParams): void {
    this.record(Array2DAction.UNSHIFT_CELLS, param);
  }

  public insertRows(param: Array2DInsertRowsParams): void {
    this.record(Array2DAction.INSERT_ROWS, param);
  }

  public pushRows(param: Array2DPushRowsParams): void {
    this.record(Array2DAction.PUSH_ROWS, param);
  }

  public popRows(param: Array2DPopRowParams): void {
    this.record(Array2DAction.POP_ROWS, param);
  }

  public shiftRows(param: Array2DShiftRowsParams): void {
    this.record(Array2DAction.SHIFT_ROWS, param);
  }

  public unshiftRows(param: Array2DUnshiftRowsParams): void {
    this.record(Array2DAction.UNSHIFT_ROWS, param);
  }

  public setCellsHighlight(param: Array2DSetCellsHighlightParams): void {
    this.record(Array2DAction.SET_CELLS_HIGHLIGHT, param);
  }

  public clearCellsHighlight(param: Array2DClearCellsHighlightParams): void {
    this.record(Array2DAction.CLEAR_CELLS_HIGHLIGHT, param);
  }

  public clearAllCellsHighlight(param: Array2DClearAllCellsHighlightParams): void {
    this.record(Array2DAction.CLEAR_ALL_CELLS_HIGHLIGHT, param);
  }

  public clearAllRowsHighlight(param: Array2DClearAllRowsHighlightParams): void {
    this.record(Array2DAction.CLEAR_ALL_ROWS_HIGHLIGHT, param);
  }
}
