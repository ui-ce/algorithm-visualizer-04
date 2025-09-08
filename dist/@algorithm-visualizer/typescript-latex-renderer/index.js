"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Array2DRenderer: () => Array2DRenderer,
  ChartRenderer: () => ChartRenderer,
  GraphRenderer: () => GraphRenderer,
  LogRenderer: () => LogRenderer,
  RendererEngine: () => RendererEngine
});
module.exports = __toCommonJS(index_exports);

// src/renderers/array-2d-renderer.ts
var Array2DRenderer = class {
  render(state, metadata) {
    const lines = [];
    const cellSize = 0.8;
    const layerShrink = 0.1;
    const minHeight = metadata?.minHeight ?? 1;
    const alignName = metadata?.alignName ?? "center";
    const tagColors = {};
    metadata?.highlightTags?.forEach((highlight) => {
      tagColors[highlight.tag] = highlight.color;
    });
    const defaultColor = metadata?.defaultColor ?? "white";
    const transparentColor = "white!0";
    const flushMap = {
      center: "center",
      left: "flushleft",
      right: "flushright"
    };
    lines.push(`\\begin{${flushMap[alignName]}}\\textbf{${state.name}}\\\\[1.75mm]\\end{${flushMap[alignName]}}`);
    lines.push("\\begin{tikzpicture}");
    const numRows = state.values.length;
    const numCols = state.values[0]?.length ?? 1;
    const actualHeight = numRows * cellSize;
    const bgHeight = Math.max(minHeight, actualHeight);
    lines.push(
      `  \\filldraw[fill=${transparentColor}, draw=none] (0cm,0cm) rectangle (${numCols * cellSize}cm, -${bgHeight}cm);`
    );
    state.values.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const x = colIndex * cellSize;
        const y = -(rowIndex * cellSize);
        if (cell.highlightTags.length > 0) {
          cell.highlightTags.forEach((tag, layerIndex) => {
            const fill = tagColors[tag] ?? defaultColor;
            const shrink = layerShrink * layerIndex;
            const xStart = x + shrink;
            const xEnd = x + cellSize - shrink;
            const yStart = y - cellSize + shrink;
            const yEnd = y - shrink;
            lines.push(
              `  \\filldraw[fill=${fill}] (${xStart}cm,${yStart}cm) rectangle (${xEnd}cm,${yEnd}cm);`
            );
          });
        } else {
          lines.push(
            `  \\filldraw[fill=${defaultColor}] (${x}cm,${y - cellSize}cm) rectangle (${x + cellSize}cm,${y}cm);`
          );
        }
        lines.push(
          `  \\node at (${x + cellSize / 2}cm,${y - cellSize / 2}cm) {${cell.value}};`
        );
      });
    });
    lines.push("\\end{tikzpicture}");
    return lines.join("\n");
  }
};

// src/renderers/chart-renderer.ts
var ChartRenderer = class {
  render(state, metadata) {
    const lines = [];
    if (state.bars.length === 0) {
      return `\\textbf{${state.name}}`;
    }
    const barWidth = metadata?.barWidth ?? 0.5;
    const barGap = metadata?.barGap ?? 0.2;
    const chartHeight = metadata?.chartHeight ?? 3.5;
    const showLabel = metadata?.showLabel ?? true;
    const showValue = metadata?.showValue ?? true;
    const alignName = metadata?.alignName ?? "center";
    const tagColors = {};
    metadata?.highlightTags?.forEach((tag) => {
      tagColors[tag.tag] = tag.color;
    });
    const defaultColor = metadata?.defaultColor ?? "gray!30";
    const transparentColor = "white!0";
    const flushMap = {
      center: "center",
      left: "flushleft",
      right: "flushright"
    };
    lines.push(`\\begin{${flushMap[alignName]}}\\textbf{${state.name}}\\\\[1.75mm]\\end{${flushMap[alignName]}}`);
    lines.push("\\begin{tikzpicture}");
    const values = state.bars.map((b) => b.value);
    const maxValue = Math.max(...values, 1);
    const scale = chartHeight / maxValue;
    state.bars.forEach((bar, i) => {
      const x = i * (barWidth + barGap);
      const height = bar.value * scale;
      lines.push(
        `  \\filldraw[fill=${transparentColor}, draw=none] (${x}cm,0) rectangle (${x + barWidth}cm,${chartHeight}cm);`
      );
      if (bar.highlightTags.length > 0) {
        const layerShrink = 0.1;
        bar.highlightTags.forEach((tag, layerIndex) => {
          const fill = tagColors[tag] ?? defaultColor;
          const xStart = x + layerShrink * layerIndex;
          const xEnd = x + barWidth - layerShrink * layerIndex;
          const yStart = layerShrink * layerIndex;
          const yEnd = height - layerShrink * layerIndex;
          lines.push(`  \\filldraw[fill=${fill}] (${xStart}cm,${yStart}cm) rectangle (${xEnd}cm,${yEnd}cm);`);
        });
      } else if (bar.value > 0) {
        lines.push(`  \\filldraw[fill=${defaultColor}] (${x}cm,0) rectangle (${x + barWidth}cm,${height}cm);`);
      }
      if (showValue) {
        lines.push(`  \\node[above] at (${x + barWidth / 2}cm,${height}cm) {${bar.value}};`);
      }
      if (showLabel && bar.label) {
        lines.push(`  \\node[below] at (${x + barWidth / 2}cm,0) {${bar.label}};`);
      }
    });
    lines.push("\\end{tikzpicture}");
    return lines.join("\n");
  }
};

// src/renderers/graph-renderer.ts
var GraphRenderer = class {
  render(state, metadata) {
    const lines = [];
    const nodeCount = state.nodes.length;
    const radius = 3;
    const minHeight = metadata?.minHeight ?? 3;
    const alignName = metadata?.alignName ?? "center";
    const flushMap = {
      center: "center",
      left: "flushleft",
      right: "flushright"
    };
    lines.push(`\\begin{${flushMap[alignName]}}\\textbf{${state.name}}\\\\[2mm]\\end{${flushMap[alignName]}}`);
    lines.push("\\begin{tikzpicture}");
    lines.push(`  \\filldraw[fill=white!0, draw=none] (-${radius + 1}cm,0) rectangle (${radius + 1}cm, -${minHeight}cm);`);
    if (nodeCount === 0) {
      lines.push("\\end{tikzpicture}");
      return lines.join("\n");
    }
    const nodeTagColors = {};
    metadata?.nodeHighlightTags?.forEach((tag) => {
      nodeTagColors[tag.tag] = tag.color;
    });
    const edgeTagColors = {};
    metadata?.edgeHighlightTags?.forEach((tag) => {
      edgeTagColors[tag.tag] = tag.color;
    });
    const defaultNodeColor = metadata?.defaultNodeColor ?? "white";
    const defaultEdgeColor = metadata?.defaultEdgeColor ?? "black";
    state.nodes.forEach((node, i) => {
      const angle = (360 * i / nodeCount).toFixed(1);
      const highlightTag = node.highlightTags[node.highlightTags.length - 1];
      const fillColor = highlightTag ? nodeTagColors[highlightTag] ?? defaultNodeColor : defaultNodeColor;
      const label = node.label ? node.label.replace(/([_%&])/g, "\\$1") : "";
      lines.push(`  \\node[circle, draw, minimum size=8mm, fill=${fillColor}] (${node.id}) at (${angle}:${radius}cm) {${label}};`);
    });
    state.edges.forEach((edge) => {
      const highlightTag = edge.highlightTags[edge.highlightTags.length - 1];
      const drawColor = highlightTag ? edgeTagColors[highlightTag] ?? defaultEdgeColor : defaultEdgeColor;
      const edgeOptions = `${drawColor}, line width=1.2pt`;
      if (edge.label) {
        const safeEdgeLabel = edge.label.replace(/([_%&])/g, "\\$1");
        lines.push(`  \\draw[${edgeOptions}] (${edge.source}) -- node[midway, sloped, above] {${safeEdgeLabel}} (${edge.target});`);
      } else {
        lines.push(`  \\draw[${edgeOptions}] (${edge.source}) -- (${edge.target});`);
      }
    });
    lines.push("\\end{tikzpicture}");
    return lines.join("\n");
  }
};

// src/renderers/log-renderer.ts
var LogRenderer = class {
  render(state, metadata) {
    const lines = [];
    const defaultColor = metadata?.defaultColor ?? "black";
    const minHeight = metadata?.minHeight ?? 0.25;
    const alignName = metadata?.alignName ?? "center";
    const flushMap = {
      center: "center",
      left: "flushleft",
      right: "flushright"
    };
    lines.push(`\\begin{${flushMap[alignName]}}\\textbf{${state.name}}\\\\[1.75mm]\\end{${flushMap[alignName]}}`);
    lines.push(`\\begin{tikzpicture}`);
    lines.push(`  \\filldraw[fill=white!0, draw=none] (0,0) rectangle (10cm, -${minHeight}cm);`);
    if (state.message) {
      lines.push(`  \\node[anchor=north, align=center, text=${defaultColor}] at (5cm,0) {\\texttt{${state.message}}};`);
    }
    lines.push(`\\end{tikzpicture}`);
    return lines.join("\n");
  }
};

// src/renderers/renderer-engine.ts
var RendererEngine = class {
  constructor() {
    this.renderersMap = /* @__PURE__ */ new Map([
      ["Graph", new GraphRenderer()],
      ["Array2D", new Array2DRenderer()],
      ["Chart", new ChartRenderer()],
      ["Log", new LogRenderer()]
    ]);
  }
  render(animation, rendererMetadata) {
    const showLine = rendererMetadata.showLine ?? true;
    const documentName = rendererMetadata.documentName ?? "Algorithm";
    const document = [];
    document.push("\\documentclass{article}");
    document.push("\\usepackage{tikz}");
    document.push("\\usetikzlibrary{matrix}");
    document.push("\\usepackage[margin=1in]{geometry}");
    document.push("\\begin{document}");
    animation.forEach((frame, frameIndex) => {
      document.push(`% --- Frame ${frameIndex} ---`);
      if (documentName) {
        document.push(`\\begin{center}\\LARGE\\textbf{${documentName}}\\\\[6mm]\\end{center}`);
      }
      frame.forEach(({ type, state }, index) => {
        const renderer = this.renderersMap.get(type);
        if (!renderer) {
          throw new Error(`No renderer registered for type: ${type}`);
        }
        const objectMetaDataEntry = rendererMetadata.objectMetaData?.find((m) => m.type === type);
        const metadata = objectMetaDataEntry?.metadata;
        document.push("\\begin{center}");
        document.push(renderer.render(state, metadata));
        document.push("\\end{center}");
        if (showLine && index < frame.length - 1) {
          document.push("\\noindent\\rule{\\linewidth}{0.3pt}");
        }
      });
      if (frameIndex < animation.length - 1) {
        document.push("\\newpage");
      }
    });
    document.push("\\end{document}");
    return document.join("\n");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Array2DRenderer,
  ChartRenderer,
  GraphRenderer,
  LogRenderer,
  RendererEngine
});
//# sourceMappingURL=index.js.map