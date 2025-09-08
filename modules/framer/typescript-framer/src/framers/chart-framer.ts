import { IFramer } from '../models/framer/i-framer.interface';
import { ChartAction } from '../models/recorder/chart/chart-action.enum';
import { ChartShiftCellsParams } from '../models/recorder/chart/chart-shift-cells-params.type';
import { ChartUnshiftCellsParams } from '../models/recorder/chart/chart-unshift-cells-params.type';
import { FrameState } from '../models/framer/frame-state.type';
import { Chart } from '../models/framer/chart/chart.type';
import { ChartState } from '../models/framer/chart/chart-state.type';
import { ChartBar } from '../models/framer/chart/chart-bar.type';
import { ChartRemoveCellsParams } from '../models/recorder/chart/chart-remove-cells-params.type';
import { ChartInitParams } from '../models/recorder/chart/chart-init-params.type';
import { ChartSetCellsParams } from '../models/recorder/chart/chart-set-cells-params.type';
import { ChartInsertCellsParams } from '../models/recorder/chart/chart-insert-cells-params.type';
import { ChartPushCellsParams } from '../models/recorder/chart/chart-push-cells-params.type';
import { ChartPopCellsParams } from '../models/recorder/chart/chart-pop-cells-params.type';
import { ChartSetCellsHighlightParams } from '../models/recorder/chart/chart-set-cells-highlight-params.type';
import { ChartClearCellsHighlightParams } from '../models/recorder/chart/chart-clear-cells-highlight-params.type';

export class ChartFramer implements IFramer {
  private _id: string;
  private _chart: Chart;

  public initialize(id: string, param: ChartInitParams): void {
    this._id = id;
    this._chart = {
      name: param.name,
      bars: param.values.map(v => ({
        value: v.value,
        label: v.label ?? null,
        highlightTags: []
      })),
    };
  }

  public applyAction(action: string, param: unknown): void {
    switch(action) {
      case ChartAction.SET_CELLS:
        this.setCells(param as ChartSetCellsParams);
        break;
      case ChartAction.INSERT_CELLS:
        this.insertCells(param as ChartInsertCellsParams);
        break;
      case ChartAction.REMOVE_CELLS:
        this.removeCells(param as ChartRemoveCellsParams);
        break;
      case ChartAction.PUSH_CELLS:
        this.pushCells(param as ChartPushCellsParams);
        break;
      case ChartAction.POP_CELLS:
        this.popCells(param as ChartPopCellsParams);
        break;
      case ChartAction.SHIFT_CELLS:
        this.shiftCells(param as ChartShiftCellsParams);
        break;
      case ChartAction.UNSHIFT_CELLS:
        this.unshiftCells(param as ChartUnshiftCellsParams);
        break;
      case ChartAction.SET_CELLS_HIGHLIGHT:
        this.setCellsHighlight(param as ChartSetCellsHighlightParams);
        break;
      case ChartAction.CLEAR_CELLS_HIGHLIGHT:
        this.clearCellsHighlight(param as ChartClearCellsHighlightParams);
        break;
      default:
        throw new Error(`Unknown ChartAction: ${action}`);
    }
  }

  private setCells({ startIndex, values }: ChartSetCellsParams): void {
    for (let i = 0; i < values.length; i++) {
      const target = this._chart.bars[startIndex + i];
      target.value = values[i].value;
      target.label = values[i].label ?? null;
    }
  }

  private insertCells({ index, values }: ChartInsertCellsParams): void {
    const newBars: ChartBar[] = values.map(v => ({
      value: v.value,
      label: v.label ?? null,
      highlightTags: []
    }));
    this._chart.bars.splice(index, 0, ...newBars);
  }

  private removeCells({ index, count }: ChartRemoveCellsParams): void {
    this._chart.bars.splice(index, count);
  }

  private pushCells({ values }: ChartPushCellsParams): void {
    const newBars: ChartBar[] = values.map(v => ({
      value: v.value,
      label: v.label ?? null,
      highlightTags: []
    }));
    this._chart.bars.push(...newBars);
  }

  private popCells({ count }: ChartPopCellsParams): void {
    this._chart.bars.splice(-count, count);
  }

  private shiftCells({ count }: ChartShiftCellsParams): void {
    this._chart.bars.splice(0, count);
  }

  private unshiftCells({ values }: ChartUnshiftCellsParams): void {
    const newBars: ChartBar[] = values.map(v => ({
      value: v.value,
      label: v.label ?? null,
      highlightTags: []
    }));
    this._chart.bars.unshift(...newBars);
  }

  private setCellsHighlight({ startIndex, endIndex, highlightTags }: ChartSetCellsHighlightParams): void {
    for (let i = startIndex; i <= endIndex; i++) {
      this._chart.bars[i].highlightTags = highlightTags;
    }
  }

  private clearCellsHighlight({ startIndex, endIndex }: ChartClearCellsHighlightParams): void {
    for (let i = startIndex; i <= endIndex; i++) {
      this._chart.bars[i].highlightTags = [];
    }
  }

  public getFrameState(): FrameState<ChartState> {
    return {
      id: this._id,
      type: 'Chart',
      state: {
        name: this._chart.name,
        bars: this._chart.bars,
      },
    };
  }
}
