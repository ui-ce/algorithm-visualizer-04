import { Component, Input } from '@angular/core';
import { Array2dState } from '../../models/framer/array-2d/array-2d-state.type';
import { Array2DMetaData } from '../../models/renderer/array-2d/array-2d-metadata.type';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { Array2DHighlightLayer } from './components/highlight-layer/array-2d-highlight-layer';

@Component({
  selector: 'array-2d-renderer',
  imports: [CommonModule, CardModule, FormsModule, TableModule, Array2DHighlightLayer],
  templateUrl: './array-2d-renderer.html',
  styleUrl: './array-2d-renderer.scss',
})
export class Array2DRenderer {
  @Input()
  public state: Array2dState;

  @Input()
  public metadata: Array2DMetaData;

  public getMinHeight(): string {
    return this.metadata?.minHeight ?? '100px';
  }

  public getDefaultColor(): string {
    return this.metadata?.defaultColor ?? 'white';
  }

  public getCellSize(): string {
    return this.metadata?.cellSize ?? '50px';
  }

  public getCellColors(cell: { value: string; highlightTags: string[] }): string[] {
    return cell.highlightTags.map((tag) => {
      const highlight = this.metadata?.highlightTags?.find((h) => h.tag === tag);
      return highlight?.color ?? this.metadata?.defaultColor ?? 'white';
    });
  }
}
