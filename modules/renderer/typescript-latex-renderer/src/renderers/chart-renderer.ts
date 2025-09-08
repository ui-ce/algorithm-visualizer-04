import { IRenderer } from '../models/renderer/i-renderer.interface';
import { ChartState } from '../models/framer/chart/chart-state.type';
import { ChartMetaData } from '../models/renderer/chart/chart-metadata.type';

export class ChartRenderer implements IRenderer {
  public render(state: ChartState, metadata?: ChartMetaData): string {
    const lines: string[] = [];

    if (state.bars.length === 0) {
      return `\\textbf{${state.name}}`;
    }

    // Configuration variables with defaults
    const barWidth = metadata?.barWidth ?? 0.5;
    const barGap = metadata?.barGap ?? 0.2;
    const chartHeight = metadata?.chartHeight ?? 3.5; // static chart height in cm
    const showLabel = metadata?.showLabel ?? true;
    const showValue = metadata?.showValue ?? true;
    const alignName = metadata?.alignName ?? 'center'; // 'center' | 'left' | 'right'

    // Build tag → color mapping
    const tagColors: Record<string, string> = {};
    metadata?.highlightTags?.forEach(tag => {
      tagColors[tag.tag] = tag.color;
    });
    const defaultColor = metadata?.defaultColor ?? 'gray!30';
    const transparentColor = 'white!0'; // fully transparent

    // Display chart name
    const flushMap = {
      center: 'center',
      left: 'flushleft',
      right: 'flushright',
    }
    lines.push(`\\begin{${flushMap[alignName]}}\\textbf{${state.name}}\\\\[1.75mm]\\end{${flushMap[alignName]}}`);

    lines.push('\\begin{tikzpicture}');

    const values = state.bars.map(b => b.value);
    const maxValue = Math.max(...values, 1); // at least 1 to avoid division by zero
    const scale = chartHeight / maxValue;

    state.bars.forEach((bar, i) => {
      const x = i * (barWidth + barGap);
      const height = bar.value * scale;

      // 1️⃣ Draw full-height transparent base bar
      lines.push(
        `  \\filldraw[fill=${transparentColor}, draw=none] (${x}cm,0) rectangle (${x + barWidth}cm,${chartHeight}cm);`
      );

      // 2️⃣ Draw actual value/highlights on top
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

    lines.push('\\end{tikzpicture}');
    return lines.join('\n');
  }
}
