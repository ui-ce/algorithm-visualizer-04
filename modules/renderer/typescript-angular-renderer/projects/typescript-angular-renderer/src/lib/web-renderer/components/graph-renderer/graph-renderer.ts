import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphState } from '../../models/framer/graph/graph-state.type';
import { GraphMetaData } from '../../models/renderer/graph/graph-metadata.type';
import cytoscape, {
  Core,
  CircleLayoutOptions,
  ConcentricLayoutOptions,
  BreadthFirstLayoutOptions,
  LayoutOptions,
} from 'cytoscape';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'graph-renderer',
  standalone: true,
  imports: [CommonModule, SelectButtonModule, CardModule, FormsModule],
  templateUrl: './graph-renderer.html',
  styleUrls: ['./graph-renderer.scss'],
})
export class GraphRenderer implements AfterViewInit, OnChanges, OnDestroy {
  @Input()
  public state: GraphState;

  @Input()
  public metadata: GraphMetaData;

  @ViewChild('cyContainer', { static: true })
  protected cyContainer: ElementRef<HTMLDivElement>;

  protected readonly circleLayout: CircleLayoutOptions = { name: 'circle' };
  protected readonly concentricLayout: ConcentricLayoutOptions = {
    name: 'concentric',
    minNodeSpacing: 30,
  };
  protected readonly breadthFirstLayout: BreadthFirstLayoutOptions = {
    name: 'breadthfirst',
  };
  protected readonly layoutOptions = [
    { label: 'Circle', value: this.circleLayout },
    { label: 'Concentric', value: this.concentricLayout },
    { label: 'Breadth First ', value: this.breadthFirstLayout },
  ];

  private _currentLayout: LayoutOptions = this.circleLayout;
  private _isInitialized: boolean = false;
  private _cy: Core;

  public get minHeight(): string {
    return this.metadata?.minHeight ?? '400px';
  }

  public ngAfterViewInit(): void {
    this.renderGraph();
    this._isInitialized = true;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ((changes['state'] || changes['metadata']) && this.cyContainer && this._isInitialized) {
      this.renderGraph();
    }
  }

  public ngOnDestroy(): void {
    this._cy?.destroy();
    this._cy = undefined;
  }

  public changeLayout(layout: LayoutOptions): void {
    this._currentLayout = layout;
    if (this._cy) {
      this._cy
        .layout({ ...this._currentLayout, animate: true, animationDuration: 500 } as any)
        .run();
    }
  }

  private renderGraph(): void {
    if (!this.state || !this.cyContainer) return;

    const nodeTagColors: Record<string, string> = {};
    this.metadata?.nodeHighlightTags?.forEach((tag) => (nodeTagColors[tag.tag] = tag.color));

    const edgeTagColors: Record<string, string> = {};
    this.metadata?.edgeHighlightTags?.forEach((tag) => (edgeTagColors[tag.tag] = tag.color));

    const defaultNodeColor = this.metadata?.defaultNodeColor ?? '#ffffff';
    const defaultEdgeColor = this.metadata?.defaultEdgeColor ?? '#000000';

    const elements = [
      ...this.state.nodes.map((n) => {
        const highlightTag = n.highlightTags.at(-1);
        return {
          data: {
            id: n.id,
            label: n.label,
            color: highlightTag
              ? (nodeTagColors[highlightTag] ?? defaultNodeColor)
              : defaultNodeColor,
          },
        };
      }),
      ...this.state.edges.map((e) => {
        const highlightTag = e.highlightTags.at(-1);
        return {
          data: {
            id: e.id,
            source: e.source,
            target: e.target,
            label: e.label,
            color: highlightTag
              ? (edgeTagColors[highlightTag] ?? defaultEdgeColor)
              : defaultEdgeColor,
            weight: parseFloat(e.label) || 1,
          },
        };
      }),
    ];

    if (!this._cy) {
      this._cy = cytoscape({
        container: this.cyContainer.nativeElement,
        elements,
        layout: this._currentLayout,
        style: [
          {
            selector: 'node',
            style: {
              width: 40,
              height: 40,
              'background-color': 'data(color)',
              label: 'data(label)',
              'text-valign': 'center',
              'text-halign': 'center',
              'border-width': 1,
              'border-color': '#000',
              color: '#000',
              'font-size': 14,
            },
          },
          {
            selector: 'edge',
            style: {
              'line-color': 'data(color)',
              'target-arrow-shape': 'triangle',
              'target-arrow-color': 'data(color)',
              'curve-style': 'bezier',
              label: 'data(label)',
              'text-background-color': '#fff',
              'text-background-opacity': 1,
              color: '#000',
              'font-size': 14,
              width: 3.5,
            },
          },
        ],
      });
      return;
    }

    this._cy.batch(() => {
      const currentIds = new Set(elements.map((element) => element.data.id));
      this._cy.elements().forEach((element) => {
        if (!currentIds.has(element.id())) {
          element.remove();

          if ((element as any)._private.group !== 'edges') {
            this._cy.layout(this._currentLayout).run();
          }
        }
      });

      for (const element of elements) {
        const existing = this._cy.getElementById(element.data.id);
        if (existing.nonempty()) {
          existing.data(element.data);
        } else {
          this._cy.add(element);

          if (!('source' in element.data)) {
            this._cy.layout(this._currentLayout).run();
          }
        }
      }
    });
  }
}
