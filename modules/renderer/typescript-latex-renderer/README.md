# TypeScript LaTeX Renderer

A TypeScript renderer compatible with the **Animation Contract**, producing LaTeX output for visualizing algorithm states. Each supported data structure has a dedicated renderer.

---

## Features

- Fully compatible with the **Animation Contract**.
- Per-structure renderers:
    - `Array2DRenderer`
    - `ChartRenderer`
    - `GraphRenderer`
    - `LogRenderer`
- Generates LaTeX strings for each frame in an animation.
- Built with **tsup**, with output located in `dist/@algorithm-visualizer/typescript-latex-renderer`.

---

## Installation

```bash
npm install @algorithm-visualizer/typescript-latex-renderer
```

keep in mind in order to be able to install this module from npm you need to first publish the built library on npm.

---

## Usage

```ts
// Example animation (from Framer)
const animation: Animation = getAnimationSomehow();

// Optional metadata
const rendererMetadata: RendererMetadata = {
  documentName: 'Example Algorithm',
  showLine: true,
};

// Render LaTeX
const engine = new RendererEngine();
const latexOutput = engine.render(animation, rendererMetadata);

console.log(latexOutput); // LaTeX document as string
```

---

## Output

- Returns a **complete LaTeX document string**.
- Each frame is rendered using the appropriate structure renderer.
- Output can be compiled with **pdflatex** or any LaTeX engine.

---

## Build

In order to build this module first we need to install its dependencies, so first be sure you are at the root of the module and then run the following commands:

```bash
npm i
```

This package uses `tsup` for building:

```bash
npm run build
```

The build will generate outputs into:

```ts
dist/@algorithm-visualizer/typescript-latex-renderer/
```

---

## Renderer Metadata

The `RendererMetadata` object allows customizing the output of the LaTeX renderer. It contains:

```ts
export type RendererMetadata = {
  documentName?: string;         // Name displayed at the top of each frame/page
  showLine?: boolean;            // Whether to draw horizontal lines between objects in a frame
  objectMetaData?: ObjectMetaDataEntry[]; // Metadata for individual objects (Array2D, Chart, Graph, Log)
}
```
### ObjectMetaDataEntry

Each entry corresponds to a single object in a frame and specifies rendering options for that object type:

```ts
export type ObjectMetaDataEntry = ChartMetadataEntry | GraphMetadataEntry | Array2DMetadataEntry | LogMetadataEntry;
```

All entries inherit from `ObjectMetadataEntryBase`:

```ts
export type ObjectMetadataEntryBase = {
  id?: string;   // Optional unique identifier
  type: string;  // Object type: 'Array2D', 'Chart', 'Graph', or 'Log'
}
```

---

### Array2D Metadata

```ts
export type Array2DMetaData = {
  defaultColor?: string;                 // Default fill color for cells
  highlightTags?: Array2DHighlightTag[]; // Array of highlight tags and their colors
  minHeight?: number;                    // Minimum display height of the array (cm)
  alignName?: 'left' | 'center' | 'right'; // Alignment of array name on page
}
```

### Chart Metadata

```ts
export type ChartMetaData = {
  defaultColor?: string;                 // Default fill color for bars
  highlightTags?: ChartHighlightTag[];  // Highlight colors per tag
  barWidth?: number;                     // Width of each bar (cm)
  barGap?: number;                       // Gap between bars (cm)
  chartHeight?: number;                  // Total height of chart (cm)
  showLabel?: boolean;                   // Display bar labels
  showValue?: boolean;                   // Display bar values
  alignName?: 'left' | 'center' | 'right'; // Alignment of chart name
}
```

### Graph Metadata

```ts
export type GraphMetaData = {
  defaultNodeColor?: string;             // Default node fill color
  defaultEdgeColor?: string;             // Default edge color
  nodeHighlightTags?: GraphHighlightTag[]; // Node highlight colors by tag
  edgeHighlightTags?: GraphHighlightTag[]; // Edge highlight colors by tag
  minHeight?: number;                    // Minimum height of the graph display (cm)
  alignName?: 'left' | 'center' | 'right'; // Alignment of graph name
}
```

### Log Metadata

```ts
export type LogMetaData = {
  defaultColor?: string;                 // Text color
  minHeight?: number;                    // Minimum display height (cm)
  alignName?: 'left' | 'center' | 'right'; // Alignment of log name
}
```

### Highlight Tags

Used in Array2D, Chart, and Graph metadata:

```ts
export type Array2DHighlightTag = { tag: string; color: string; }
export type ChartHighlightTag = { tag: string; color: string; }
export type GraphHighlightTag = { tag: string; color: string; }
```