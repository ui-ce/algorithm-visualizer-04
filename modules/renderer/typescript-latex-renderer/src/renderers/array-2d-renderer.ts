import { IRenderer } from '../models/renderer/i-renderer.interface';
import { Array2dState } from '../models/framer/array-2d/array-2d-state.type';
import { Array2DMetaData } from '../models/renderer/array-2d/array-2d-metadata.type';

export class Array2DRenderer implements IRenderer {
  public render(state: Array2dState, metadata?: Array2DMetaData): string {
    const lines: string[] = [];

    // Configuration
    const cellSize = 0.8;              // cm per cell side
    const layerShrink = 0.1;           // cm shrink per highlight layer
    const minHeight = metadata?.minHeight ?? 1; // minimum chart height in cm
    const alignName = metadata?.alignName ?? 'center'; // 'center' | 'left' | 'right'

    // Build tag → color mapping
    const tagColors: Record<string, string> = {};
    metadata?.highlightTags?.forEach(highlight => {
      tagColors[highlight.tag] = highlight.color;
    });
    const defaultColor = metadata?.defaultColor ?? 'white';
    const transparentColor = 'white!0'; // fully transparent

    // Display name with page alignment
    const flushMap = {
      center: 'center',
      left: 'flushleft',
      right: 'flushright',
    }
    lines.push(`\\begin{${flushMap[alignName]}}\\textbf{${state.name}}\\\\[1.75mm]\\end{${flushMap[alignName]}}`);

    lines.push("\\begin{tikzpicture}");

    const numRows = state.values.length;
    const numCols = state.values[0]?.length ?? 1; // default 1 column if empty

    const actualHeight = numRows * cellSize;
    const bgHeight = Math.max(minHeight, actualHeight);

    // Draw transparent background to enforce minHeight even if no cells
    lines.push(
      `  \\filldraw[fill=${transparentColor}, draw=none] (0cm,0cm) rectangle (${numCols * cellSize}cm, -${bgHeight}cm);`
    );

    // Draw actual cells if any
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

        // Draw value centered in the cell
        lines.push(
          `  \\node at (${x + cellSize / 2}cm,${y - cellSize / 2}cm) {${cell.value}};`
        );
      });
    });

    lines.push("\\end{tikzpicture}");
    return lines.join("\n");
  }
}
