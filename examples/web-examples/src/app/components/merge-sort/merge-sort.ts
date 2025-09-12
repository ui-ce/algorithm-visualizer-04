import { Component, OnInit } from '@angular/core';
import { mergeSortVisualization } from '../../algorithm/merge-sort';
import { Slider } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import {
  RendererMetadata,
  WebRenderer,
  Animation,
} from '@algorithm-visualizer/typescript-angular-renderer';
import { FramerEngine } from '@algorithm-visualizer/typescript-framer';
import { Button } from 'primeng/button';

@Component({
  selector: 'algo-merge-sort',
  imports: [WebRenderer, Slider, FormsModule, Button],
  templateUrl: './merge-sort.html',
  styleUrl: './merge-sort.scss',
})
export class MergeSort implements OnInit {
  protected animation: Animation;
  protected rendererMetadata: RendererMetadata = {
    documentName: 'Merge Sort',
    objectMetaData: [
      {
        type: 'Chart',
        metadata: {
          chartHeight: '400px',
          highlightTags: [
            { tag: 'section', color: '#4050e3' },
            { tag: 'sorting', color: 'orange' },
          ],
        },
      },
    ],
  };

  protected minMax: [number, number] = [30, 70];
  protected count: number = 20;

  public ngOnInit() {
    this.run();
  }

  protected run(): void {
    const array = Array(this.count)
      .fill(0)
      .map(() => Math.floor(Math.random() * (this.minMax[1] - this.minMax[0]) + this.minMax[0]));

    const recording = mergeSortVisualization(array);
    this.animation = new FramerEngine().getAnimation(recording);
  }
}
