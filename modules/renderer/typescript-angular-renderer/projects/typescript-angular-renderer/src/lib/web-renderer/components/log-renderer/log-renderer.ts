import { Component, Input } from '@angular/core';
import { LogState } from '../../models/framer/log/log-state.type';
import { LogMetaData } from '../../models/renderer/log/log-metadata.type';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'log-renderer',
  imports: [CommonModule, CardModule, FormsModule],
  templateUrl: './log-renderer.html',
  styleUrl: './log-renderer.scss',
})
export class LogRenderer {
  @Input()
  public state: LogState;

  @Input()
  public metadata: LogMetaData;

  public getMinHeight(): string {
    return this.metadata?.minHeight ?? '100px';
  }

  public getColor(): string {
    return this.metadata?.defaultColor ?? 'black';
  }
}
