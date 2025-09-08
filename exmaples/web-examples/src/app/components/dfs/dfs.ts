import { Component, OnInit } from '@angular/core';
import {
  Animation,
  RendererMetadata,
  WebRenderer,
} from '@algorithm-visualizer/typescript-angular-renderer';
import { Slider } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { FramerEngine } from '@algorithm-visualizer/typescript-framer';
import { SelectModule } from 'primeng/select';
import { Button } from 'primeng/button';
import { dfsVisualization } from '../../algorithm/dfs';

@Component({
  selector: 'app-dfs',
  imports: [WebRenderer, Slider, FormsModule, SelectModule, Button],
  templateUrl: './dfs.html',
  styleUrl: './dfs.scss',
})
export class Dfs implements OnInit {
  protected animation: Animation;
  protected rendererMetadata: RendererMetadata = {
    documentName: 'DFS',
    objectMetaData: [
      {
        type: 'Graph',
        metadata: {
          defaultNodeColor: 'white',
          defaultEdgeColor: 'black',
          nodeHighlightTags: [{ tag: 'visit', color: 'blue' }],
          minHeight: '350px',
        },
      },
      {
        type: 'Log',
        metadata: {
          minHeight: '120px',
          defaultColor: '#444',
        },
      },
      {
        type: 'Array2D',
        metadata: {
          cellSize: '50px',
          minHeight: '140px',
          highlightTags: [
            { tag: 'remove', color: 'red' },
            { tag: 'new', color: 'green' },
          ],
        },
      },
    ],
  };

  protected nodeDensity: number = 6;

  public ngOnInit() {
    this.run();
  }

  protected run(): void {
    const tree = this.generateFullTree(this.nodeDensity);

    const recording = dfsVisualization(tree);
    this.animation = new FramerEngine().getAnimation(recording);
  }

  private generateFullTree(nodeCount: number): Record<string, string[]> {
    const nodes = Array.from({ length: nodeCount }, (_, i) => String.fromCharCode(65 + i));

    const tree: Record<string, string[]> = {};
    nodes.forEach((n) => (tree[n] = []));

    for (let i = 1; i < nodeCount; i++) {
      const from = nodes[i];
      const to = nodes[Math.floor(Math.random() * i)];

      tree[to].push(from);
    }

    return tree;
  }
}
