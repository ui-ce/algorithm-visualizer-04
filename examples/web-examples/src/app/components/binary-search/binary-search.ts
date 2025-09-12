import { Component, OnInit } from '@angular/core';
import {
  Animation,
  RendererMetadata,
  WebRenderer,
} from '@algorithm-visualizer/typescript-angular-renderer';
import { FramerEngine } from '@algorithm-visualizer/typescript-framer';
import { Slider } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { binarySearchVisualization } from '../../algorithm/binary-search';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';

@Component({
  selector: 'algo-binary-search',
  imports: [WebRenderer, Slider, FormsModule, InputNumber, Select, Button],
  templateUrl: './binary-search.html',
  styleUrl: './binary-search.scss',
})
export class BinarySearch implements OnInit {
  protected animation: Animation;
  protected rendererMetadata: RendererMetadata = {
    documentName: 'Binary Search',
    objectMetaData: [
      {
        type: 'Chart',
        metadata: {
          chartHeight: '400px',
          highlightTags: [
            { tag: 'section', color: '#4050e3' },
            { tag: 'middle', color: 'orange' },
            { tag: 'target', color: 'green' },
          ],
        },
      },
    ],
  };

  protected minMax: [number, number] = [30, 70];
  protected count: number = 20;
  protected target: number = Math.floor(
    Math.random() * (this.minMax[1] - this.minMax[0]) + this.minMax[0],
  );

  public ngOnInit() {
    this.run();
  }

  protected run(): void {
    const array = Array(this.count)
      .fill(0)
      .map(() => Math.floor(Math.random() * (this.minMax[1] - this.minMax[0]) + this.minMax[0]));

    const recording = binarySearchVisualization(
      array.sort((a, b) => a - b),
      this.target,
    );
    this.animation = new FramerEngine().getAnimation(recording);
  }
}
