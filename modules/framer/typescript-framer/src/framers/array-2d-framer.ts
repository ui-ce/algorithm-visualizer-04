import { IFramer } from '../models/framer/i-framer.interface';
import { Array2DInitParams } from '../models/recorder/array-2d/array-2d-init-params.type';
import { Array2DAction } from '../models/recorder/array-2d/array-2d-action.enum';
import { Array2DSetCellsParams } from '../models/recorder/array-2d/array-2d-set-cells-params.type';
import { Array2DInsertCellsParams } from '../models/recorder/array-2d/array-2d-insert-cells-params.type';
import { Array2DPushCellsParams } from '../models/recorder/array-2d/array-2d-push-cells-params.type';
import { Array2DPopCellsParams } from '../models/recorder/array-2d/array-2d-pop-cells-params.type';
import { Array2DInsertRowsParams } from '../models/recorder/array-2d/array-2d-insert-rows-params.type';
import { Array2DPushRowsParams } from '../models/recorder/array-2d/array-2d-push-rows-params.type';
import { Array2DPopRowParams } from '../models/recorder/array-2d/array-2d-pop-row-params.type';
import { Array2d } from '../models/framer/array-2d/array-2d.type';
import { Array2dState } from '../models/framer/array-2d/array-2d-state.type';
import { FrameState } from '../models/framer/frame-state.type';
import { Array2dCell } from '../models/framer/array-2d/array-2d-cell.type';
import { Array2DSetCellsHighlightParams } from '../models/recorder/array-2d/array-2d-set-cells-highlight-params.type';
import { Array2DClearCellsHighlightParams } from '../models/recorder/array-2d/array-2d-clear-cells-highlight-params.type';
import { Array2DShiftRowsParams } from '../models/recorder/array-2d/array-2d-shift-rows-params.type';
import { Array2DUnshiftRowsParams } from '../models/recorder/array-2d/array-2d-unshift-rows-params.type';
import { Array2DRemoveCellsParams } from '../models/recorder/array-2d/array-2d-remove-cells-params.type';
import { Array2DShiftCellsParams } from '../models/recorder/array-2d/array-2d-shift-cells-params.type';
import { Array2DUnshiftCellsParams } from '../models/recorder/array-2d/array-2d-unshift-cells-params.type';
import {
  Array2DClearAllRowsHighlightParams
} from '../models/recorder/array-2d/array-2d-clear-all-rows-highlight-params.type';
import {
  Array2DClearAllCellsHighlightParams
} from '../models/recorder/array-2d/array-2d-clear-all-cells-highlight-params.type';

export class Array2DFramer implements IFramer {
  private _id: string;
  private _array2D: Array2d;

  public initialize(id: string, param: Array2DInitParams): void {
    this._id = id;
    this._array2D = {
      name: param.name,
      values: param.values.map(row =>
        row.map(item => ({ value: item, highlightTags: [] }))
      ),
    };
  }

  public applyAction(action: string, param: unknown): void {
    switch (action) {
      case Array2DAction.SET_CELLS:
        this.setCells(param as Array2DSetCellsParams);
        break;
      case Array2DAction.INSERT_CELLS:
        this.insertCells(param as Array2DInsertCellsParams);
        break;
      case Array2DAction.REMOVE_CELLS:
        this.removeCells(param as Array2DRemoveCellsParams);
        break;
      case Array2DAction.PUSH_CELLS:
        this.pushCells(param as Array2DPushCellsParams);
        break;
      case Array2DAction.POP_CELLS:
        this.popCells(param as Array2DPopCellsParams);
        break;
      case Array2DAction.SHIFT_CELLS:
        this.shiftCells(param as Array2DShiftCellsParams);
        break;
      case Array2DAction.UNSHIFT_CELLS:
        this.unshiftCells(param as Array2DUnshiftCellsParams);
        break;
      case Array2DAction.INSERT_ROWS:
        this.insertRows(param as Array2DInsertRowsParams);
        break;
      case Array2DAction.PUSH_ROWS:
        this.pushRows(param as Array2DPushRowsParams);
        break;
      case Array2DAction.POP_ROWS:
        this.popRows(param as Array2DPopRowParams);
        break;
      case Array2DAction.SHIFT_ROWS:
        this.shiftRows(param as Array2DShiftRowsParams);
        break;
      case Array2DAction.UNSHIFT_ROWS:
        this.unshiftRows(param as Array2DUnshiftRowsParams);
        break;
      case Array2DAction.SET_CELLS_HIGHLIGHT:
        this.setCellsHighlight(param as Array2DSetCellsHighlightParams);
        break;
      case Array2DAction.CLEAR_CELLS_HIGHLIGHT:
        this.clearCellsHighlight(param as Array2DClearCellsHighlightParams);
        break;
      case Array2DAction.CLEAR_ALL_CELLS_HIGHLIGHT:
        this.clearAllCellsHighlight(param as Array2DClearAllCellsHighlightParams);
        break;
      case Array2DAction.CLEAR_ALL_ROWS_HIGHLIGHT:
        this.clearAllRowsHighlight(param as Array2DClearAllRowsHighlightParams);
        break;
      default:
        throw new Error(`Unknown Array2DAction: ${action}`);
    }
  }

  private setCells({ rowIndex, startIndex, values }: Array2DSetCellsParams): void {
    const row = this._array2D.values[rowIndex];
    if (!row) return;

    values.forEach((value, idx) => {
      const targetIndex = startIndex + idx;
      if (row[targetIndex]) {
        const oldCell = row[targetIndex];
        row[targetIndex] = { ...oldCell, value };
      }
    });
  }

  private insertCells({ rowIndex, index, values }: Array2DInsertCellsParams): void {
    const row = this._array2D.values[rowIndex];
    if (!row) return;

    const cells: Array2dCell[] = values.map(v => ({ value: v, highlightTags: [] }));
    row.splice(index, 0, ...cells);
  }

  private removeCells({ rowIndex, index, count }: Array2DRemoveCellsParams): void {
    const row = this._array2D.values[rowIndex];
    if (!row) return;

    row.splice(index, count);
  }

  private pushCells({ rowIndex, values }: Array2DPushCellsParams): void {
    const row = this._array2D.values[rowIndex];
    if (!row) return;

    const cells: Array2dCell[] = values.map(v => ({ value: v, highlightTags: [] }));
    row.push(...cells);
  }

  private popCells({ rowIndex, count }: Array2DPopCellsParams): void {
    const row = this._array2D.values[rowIndex];
    if (!row) return;

    row.splice(-count, count);
  }

  private shiftCells({ rowIndex, count }: Array2DShiftCellsParams): void {
    const row = this._array2D.values[rowIndex];
    if (!row) return;

    row.splice(0, count);
  }

  private unshiftCells({ rowIndex, values }: Array2DUnshiftCellsParams): void {
    const row = this._array2D.values[rowIndex];
    if (!row) return;

    const cells: Array2dCell[] = values.map(v => ({ value: v, highlightTags: [] }));
    row.unshift(...cells);
  }

  private insertRows({ rowIndex, values }: Array2DInsertRowsParams): void {
    const rows: Array2dCell[][] = values.map(r =>
      r.map(item => ({ value: item, highlightTags: [] }))
    );
    this._array2D.values.splice(rowIndex, 0, ...rows);
  }

  private pushRows({ values }: Array2DPushRowsParams): void {
    const rows: Array2dCell[][] = values.map(r =>
      r.map(item => ({ value: item, highlightTags: [] }))
    );
    this._array2D.values.push(...rows);
  }

  private popRows({ count }: Array2DPopRowParams): void {
    this._array2D.values.splice(-count, count);
  }

  private shiftRows({ count }: Array2DShiftRowsParams): void {
    this._array2D.values.splice(0, count);
  }

  private unshiftRows({ values }: Array2DUnshiftRowsParams): void {
    const rows: Array2dCell[][] = values.map(r =>
      r.map(item => ({ value: item, highlightTags: [] }))
    );
    this._array2D.values.unshift(...rows);
  }

  private setCellsHighlight({ rowIndex, startIndex, endIndex, highlightTags }: Array2DSetCellsHighlightParams): void {
    const row = this._array2D.values[rowIndex];
    if (!row) return;

    for (let i = startIndex; i <= endIndex; i++) {
      if (row[i]) {
        row[i].highlightTags = [...highlightTags];
      }
    }
  }

  private clearCellsHighlight({ rowIndex, startIndex, endIndex }: Array2DClearCellsHighlightParams): void {
    const row = this._array2D.values[rowIndex];
    if (!row) return;

    for (let i = startIndex; i <= endIndex; i++) {
      if (row[i]) {
        row[i].highlightTags = [];
      }
    }
  }

  private clearAllCellsHighlight({ rowIndex }: Array2DClearAllCellsHighlightParams): void {
    const row = this._array2D.values[rowIndex];

    if (!row) {
      return;
    }

    row.forEach((cell) => cell.highlightTags = []);
  }

  private clearAllRowsHighlight(params: Array2DClearAllRowsHighlightParams): void {
    this._array2D.values.forEach(row  => row.forEach((cell) => cell.highlightTags = []));
  }

  public getFrameState(): FrameState<Array2dState> {
    return {
      id: this._id,
      type: 'Array2D',
      state: this._array2D,
    };
  }
}
