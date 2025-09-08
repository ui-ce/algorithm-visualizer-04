import { Component, Input } from '@angular/core';
import { Animation } from './models/framer/animation.type';
import { Frame } from './models/framer/frame.type';
import { FormsModule } from '@angular/forms';
import { GraphState } from './models/framer/graph/graph-state.type';
import { GraphRenderer } from './components/graph-renderer/graph-renderer';
import { GraphMetaData } from './models/renderer/graph/graph-metadata.type';
import { KnobModule } from 'primeng/knob';
import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { RendererMetadata } from './models/renderer/renderer-metadata.type';
import { ObjectMetadata } from './models/renderer/object-metadata.type';
import { ChartMetaData } from './models/renderer/chart/chart-metadata.type';
import { Array2DMetaData } from './models/renderer/array-2d/array-2d-metadata.type';
import { LogMetaData } from './models/renderer/log/log-metadata.type';
import { ChartState } from './models/framer/chart/chart-state.type';
import { Array2dState } from './models/framer/array-2d/array-2d-state.type';
import { LogState } from './models/framer/log/log-state.type';
import { LogRenderer } from './components/log-renderer/log-renderer';
import { Array2DRenderer } from './components/array-2d-renderer/array-2d-renderer';
import { ChartRenderer } from './components/chart-renderer/chart-renderer';
import { WebPlayer } from '../web-player/web-player';

@Component({
  selector: 'web-renderer',
  imports: [
    FormsModule,
    GraphRenderer,
    KnobModule,
    SliderModule,
    ButtonModule,
    LogRenderer,
    Array2DRenderer,
    ChartRenderer,
    WebPlayer,
  ],
  templateUrl: './web-renderer.html',
  styleUrls: ['./web-renderer.scss'],
})
export class WebRenderer {
  @Input()
  public animation: Animation;

  @Input()
  public rendererMetadata: RendererMetadata;

  @Input()
  public frameIndex: number = 0;

  @Input()
  public hasPlayer: boolean = true;

  public get currentFrame(): Frame | null {
    return (
      this.animation?.[Math.max(0, Math.min(this.frameIndex, this.animation.length - 1))] ?? null
    );
  }

  protected getDocumentName(): string {
    return this.rendererMetadata?.documentName ?? 'Algorithm';
  }

  protected onFrameIndexChange(frameIndex: number) {
    this.frameIndex = frameIndex;
  }

  protected convertToGraphState(state: unknown): GraphState {
    return state as GraphState;
  }

  protected convertToChartState(state: unknown): ChartState {
    return state as ChartState;
  }

  protected convertToArray2dState(state: unknown): Array2dState {
    return state as Array2dState;
  }

  protected convertToLogState(state: unknown): LogState {
    return state as LogState;
  }

  protected getMetaData(type: string, id: string): ObjectMetadata {
    return this.rendererMetadata?.objectMetaData?.find(
      (objectMetadataEntry) => objectMetadataEntry.type === type,
    )?.metadata;
  }

  protected convertToGraphMetadata(metadata: ObjectMetadata): GraphMetaData {
    return metadata as GraphMetaData;
  }

  protected convertToChartMetaData(metadata: ObjectMetadata): ChartMetaData {
    return metadata as ChartMetaData;
  }

  protected convertToArray2DMetaData(metadata: ObjectMetadata): Array2DMetaData {
    return metadata as Array2DMetaData;
  }

  protected convertToLogMetaData(metadata: ObjectMetadata): LogMetaData {
    return metadata as LogMetaData;
  }
}
