# TypeScript Angular Renderer

`@algorithm-visualizer/typescript-angular-renderer` is an Angular library providing interactive visualization components for algorithm animations. It includes 2D arrays, charts, graphs, logs, and a web player for frame navigation.

---

## Features

- **Array2DRenderer** – Visualize 2D arrays with multi-layer highlights.
- **ChartRenderer** – Display bar charts with highlight support.
- **GraphRenderer** – Visualize graphs using Cytoscape with multiple layouts.
- **LogRenderer** – Display text messages with configurable color and height.
- **WebPlayer** – Control playback of animation frames (first, previous, play/pause, next, last, and frame speed).

---

## Installation

```bash
npm install @algorithm-visualizer/typescript-angular-renderer
```

Peer dependencies:
- @angular/common ^20.2.0
- @angular/core ^20.2.0
- @angular/forms ^20.2.0
- primeng ^20.0.1
- primeicons ^7.0.0
- cytoscape ^3.33.1

keep in mind in order to be able to install this module from npm you need to first publish the built library on npm.

---

## Building the Library


In order to build this module first we need to install the angular project's dependencies, so first be sure you are at the root of the module and then run the following commands:

```bash
npm i
```

Then navigate to `/projects/typescript-angular-renderer` and run the following command to install the angular libraries dependencies:

```bash
npm i
```

After that you should be able to build the library by navigating to `/src` and running the command below:

```bash
ng build typescript-angular-renderer
```

For continuous development with watch mode:

```bash
ng build --watch --configuration development
```

The compiled output will be placed in:

```ts
dist/@algorithm-visualizer/typescript-angular-renderer
```

---

## Usage

### Importing the Components

All components are Angular standalone or library components. Import them in your Angular module or component:

```ts
import { Array2DRenderer } from '@algorithm-visualizer/typescript-angular-renderer';
import { ChartRenderer } from '@algorithm-visualizer/typescript-angular-renderer';
import { GraphRenderer } from '@algorithm-visualizer/typescript-angular-renderer';
import { LogRenderer } from '@algorithm-visualizer/typescript-angular-renderer';
import { WebPlayer } from '@algorithm-visualizer/typescript-angular-renderer';
```

---

### Passing Input

Each renderer takes `state` and `metadata` via Angular `@Input()`:

```html
<array-2d-renderer [state]="arrayState" [metadata]="arrayMetadata"></array-2d-renderer>
<chart-renderer [state]="chartState" [metadata]="chartMetadata"></chart-renderer>
<graph-renderer [state]="graphState" [metadata]="graphMetadata"></graph-renderer>
<log-renderer [state]="logState" [metadata]="logMetadata"></log-renderer>
<web-player
  [animationLength]="animation.length"
  [(frameIndex)]="currentFrame"
  [frameTime]="200"
></web-player>
```

---

### Renderer Metadata

Each renderer supports a metadata object that allows customizing appearance and behavior.

#### Array2DRenderer Metadata (`Array2DMetaData`)

```ts
export type Array2DMetaData = {
  defaultColor?: string;           // Background color of cells
  highlightTags?: Array2DHighlightTag[];  // Tags to map highlights to colors
  minHeight?: string;              // Minimum height of the renderer
  cellSize?: string;               // Width/height of each cell
};
```

#### ChartRenderer Metadata (`ChartMetaData`)

```ts
export type ChartMetaData = {
  defaultColor?: string;           // Default bar color
  highlightTags?: ChartHighlightTag[]; // Highlight tags for bars
  barWidth?: string;               // Width of each bar
  barGap?: string;                 // Gap between bars
  chartHeight?: string;            // Chart height
  showLabel?: boolean;             // Show bar labels
  showValue?: boolean;             // Show bar values
};
```

#### GraphRenderer Metadata (`GraphMetaData`)

```ts
export type GraphMetaData = {
  defaultNodeColor?: string;       // Default node color
  defaultEdgeColor?: string;       // Default edge color
  nodeHighlightTags?: GraphHighlightTag[]; // Node highlight colors
  edgeHighlightTags?: GraphHighlightTag[]; // Edge highlight colors
  minHeight?: string;              // Minimum height of the graph container
};
```

#### LogRenderer Metadata (`LogMetaData`)

```ts
export type LogMetaData = {
  defaultColor?: string;           // Text color
  minHeight?: string;              // Minimum height of log box
};
```

---

## Web Player

The `WebPlayer` allows controlling the animation frame sequence:

**Inputs:**

- `animationLength` – total number of frames
- `frameIndex` – current frame index (two-way binding)
- `frameTime` – speed of playback in milliseconds

**Outputs:**

- `frameIndexChange` – emits the updated frame index

Controls: first, previous, play/pause, next, last, and a slider for manual frame selection.

---

## Example

### component.ts

```ts
import { Component } from '@angular/core';
import { Array2dState } from '@algorithm-visualizer/typescript-angular-renderer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  animation: Animation;
  rendererMetadata: RendererMetadata = {
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
}
```

### component.html

```html
<web-renderer [animation]="animation" [rendererMetadata]="rendererMetadata"></web-renderer>
```
