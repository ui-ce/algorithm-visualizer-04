import { Component, Input } from '@angular/core';
import { Array2DHighlightLayer } from '../../array-2d-renderer/components/highlight-layer/array-2d-highlight-layer';

@Component({
  selector: 'chart-highlight-layer',
  imports: [Array2DHighlightLayer],
  templateUrl: './chart-highlight-layer.html',
  styleUrl: './chart-highlight-layer.scss',
})
export class ChartHighlightLayer {
  @Input()
  public colors: string[];
}
