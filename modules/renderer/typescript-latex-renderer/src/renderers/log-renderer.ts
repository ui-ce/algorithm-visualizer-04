import { IRenderer } from '../models/renderer/i-renderer.interface';
import { LogState } from '../models/framer/log/log-state.type';
import { LogMetaData } from '../models/renderer/log/log-metadata.type';

export class LogRenderer implements IRenderer {
  public render(state: LogState, metadata?: LogMetaData): string {
    const lines: string[] = [];

    // Configuration defaults
    const defaultColor = metadata?.defaultColor ?? 'black';
    const minHeight = metadata?.minHeight ?? 0.25; // cm
    const alignName = metadata?.alignName ?? 'center'; // left | center | right

    // Mapping for LaTeX flush environments
    const flushMap: Record<string, string> = {
      center: 'center',
      left: 'flushleft',
      right: 'flushright',
    };

    // Display name with alignment
    lines.push(`\\begin{${flushMap[alignName]}}\\textbf{${state.name}}\\\\[1.75mm]\\end{${flushMap[alignName]}}`);

    // Reserve space for minHeight
    lines.push(`\\begin{tikzpicture}`);
    lines.push(`  \\filldraw[fill=white!0, draw=none] (0,0) rectangle (10cm, -${minHeight}cm);`);

    // Draw the message centered if exists
    if (state.message) {
      lines.push(`  \\node[anchor=north, align=center, text=${defaultColor}] at (5cm,0) {\\texttt{${state.message}}};`);
    }

    lines.push(`\\end{tikzpicture}`);

    return lines.join('\n');
  }
}
