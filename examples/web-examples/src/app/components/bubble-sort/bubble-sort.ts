import { Component, OnInit } from '@angular/core';
import { Slider } from 'primeng/slider';
import {
  Animation,
  RendererMetadata,
  WebRenderer,
} from '@algorithm-visualizer/typescript-angular-renderer';
import { FramerEngine } from '@algorithm-visualizer/typescript-framer';
import { FormsModule } from '@angular/forms';
import { bubbleSortVisualization } from '../../algorithm/bubble-sort';
import { Button } from 'primeng/button';

@Component({
  selector: 'algo-bubble-sort',
  imports: [WebRenderer, Slider, FormsModule, Button],
  templateUrl: './bubble-sort.html',
  styleUrl: './bubble-sort.scss',
})
export class BubbleSort implements OnInit {
  protected animation: Animation;
  protected rendererMetadata: RendererMetadata = {
    documentName: 'Bubble Sort',
    objectMetaData: [
      {
        type: 'Chart',
        metadata: {
          chartHeight: '400px',
          highlightTags: [
            { tag: 'compare', color: '#4050e3' },
            { tag: 'swap', color: 'orange' },
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

    const recording = bubbleSortVisualization(array);
    this.animation = new FramerEngine().getAnimation(recording);
  }
}
