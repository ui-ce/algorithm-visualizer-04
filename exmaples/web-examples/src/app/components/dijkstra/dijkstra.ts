import { Component, OnInit } from '@angular/core';
import {
  Animation,
  RendererMetadata,
  WebRenderer,
} from '@algorithm-visualizer/typescript-angular-renderer';
import { Slider } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { FramerEngine } from '@algorithm-visualizer/typescript-framer';
import { dijkstraVisualization } from '../../algorithm/dijkstra';
import { SelectModule } from 'primeng/select';
import { SelectOption } from './models/select-option.type';
import { Button } from 'primeng/button';

@Component({
  selector: 'algo-dijkstra',
  imports: [WebRenderer, Slider, FormsModule, SelectModule, Button],
  templateUrl: './dijkstra.html',
  styleUrl: './dijkstra.scss',
})
export class Dijkstra implements OnInit {
  protected animation: Animation;
  protected rendererMetadata: RendererMetadata = {
    documentName: 'Dijkstra',
    objectMetaData: [
      {
        type: 'Graph',
        metadata: {
          defaultNodeColor: 'white',
          defaultEdgeColor: 'black',
          nodeHighlightTags: [
            { tag: 'current', color: 'blue' },
            { tag: 'closed', color: 'yellow' },
            { tag: 'open', color: 'green' },
          ],
          edgeHighlightTags: [
            { tag: 'final-path', color: 'green' },
            { tag: 'path', color: 'red' },
            { tag: 'compare', color: 'orange' },
          ],
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
            { tag: 'sorting', color: 'orange' },
          ],
        },
      },
      {
        type: 'Chart',
        metadata: {
          chartHeight: '200px',
          barWidth: '20px',
          barGap: '5px',
          highlightTags: [{ tag: 'changed', color: 'orange' }],
        },
      },
    ],
  };

  protected nodeDensity: number = 6;
  protected edgeDensity: number = 15;
  protected maxEdgeDensity: number = this.calcMaxEdgeCount() / 2;
  protected distanceRange: [number, number] = [10, 25];
  protected nodeOptions: SelectOption[] = Array.from({ length: this.nodeDensity }, (_, i) =>
    String.fromCharCode(65 + i),
  ).map((nodeName) => ({ value: nodeName, label: nodeName }));
  protected startNode: string = String.fromCharCode(65);
  protected endNode: string = String.fromCharCode(65 + this.nodeDensity - 1);

  public ngOnInit() {
    this.run();
  }

  protected onNodeDensityChanged(): void {
    this.maxEdgeDensity = this.calcMaxEdgeCount() / 2;
    this.edgeDensity = Math.min(this.maxEdgeDensity, this.edgeDensity);
    this.nodeOptions = Array.from({ length: this.nodeDensity }, (_, i) =>
      String.fromCharCode(65 + i),
    ).map((nodeName) => ({ value: nodeName, label: nodeName }));
    this.endNode = String.fromCharCode(
      Math.min(this.endNode.charCodeAt(0), 65 + this.nodeDensity - 1),
    );
    this.run();
  }

  protected calcMaxEdgeCount(): number {
    return (this.nodeDensity - 1) * this.nodeDensity;
  }

  protected run(): void {
    const graph: Record<string, Record<string, number>[]> = this.generateRandomGraph(
      this.nodeDensity,
      this.edgeDensity,
      this.distanceRange,
    );

    const recording = dijkstraVisualization(graph, this.startNode, this.endNode);
    this.animation = new FramerEngine().getAnimation(recording);
  }

  private generateRandomGraph(
    nodeCount: number,
    edgeCount: number,
    distanceRange: [number, number],
  ): Record<string, Record<string, number>[]> {
    const nodes = Array.from({ length: nodeCount }, (_, i) => String.fromCharCode(65 + i));

    const graph: Record<string, Record<string, number>[]> = {};
    nodes.forEach((n) => (graph[n] = []));

    const edges = new Set<string>();

    while (edges.size < edgeCount) {
      const from = nodes[Math.floor(Math.random() * nodeCount)];
      const to = nodes[Math.floor(Math.random() * nodeCount)];

      if (from === to) continue;

      const key = `${from}-${to}`;
      if (edges.has(key)) continue;

      const weight =
        Math.floor(Math.random() * (distanceRange[1] - distanceRange[0] + 1)) + distanceRange[0];

      graph[from].push({ [to]: weight });
      edges.add(key);
    }

    return graph;
  }
}
