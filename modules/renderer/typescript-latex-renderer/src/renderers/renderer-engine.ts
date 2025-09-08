import { Animation } from '../models/framer/animation.type';
import { GraphRenderer } from './graph-renderer';
import { IRenderer } from '../models/renderer/i-renderer.interface';
import { Frame } from '../models/framer/frame.type';
import { FrameState } from '../models/framer/frame-state.type';
import { Array2DRenderer } from './array-2d-renderer';
import { ChartRenderer } from './chart-renderer';
import { LogRenderer } from './log-renderer';
import { RendererMetadata } from '../models/renderer/renderer-metadata.type';
import { ObjectMetaDataEntry } from '../models/renderer/object-metadata-entry.type';

export class RendererEngine {
  private readonly renderersMap: Map<string, IRenderer> = new Map<string, IRenderer>([
    ['Graph', new GraphRenderer()],
    ['Array2D', new Array2DRenderer()],
    ['Chart', new ChartRenderer()],
    ['Log', new LogRenderer()]
  ]);

  public render(animation: Animation, rendererMetadata: RendererMetadata): string {
    const showLine = rendererMetadata.showLine ?? true;
    const documentName = rendererMetadata.documentName ?? 'Algorithm';
    const document: string[] = [];

    // Document header
    document.push("\\documentclass{article}");
    document.push("\\usepackage{tikz}");
    document.push("\\usetikzlibrary{matrix}");
    document.push("\\usepackage[margin=1in]{geometry}");
    document.push("\\begin{document}");

    // Render each frame
    animation.forEach((frame: Frame, frameIndex: number) => {
      document.push(`% --- Frame ${frameIndex} ---`);

      // Show document name at the top of each page (if provided)
      if (documentName) {
        document.push(`\\begin{center}\\LARGE\\textbf{${documentName}}\\\\[6mm]\\end{center}`);
      }

      frame.forEach(({ type, state }: FrameState, index: number) => {
        const renderer = this.renderersMap.get(type);
        if (!renderer) {
          throw new Error(`No renderer registered for type: ${type}`);
        }

        const objectMetaDataEntry: ObjectMetaDataEntry = rendererMetadata.objectMetaData?.find(m => m.type === type);
        const metadata = objectMetaDataEntry?.metadata;

        // Wrap each renderer output in center
        document.push("\\begin{center}");
        document.push(renderer.render(state, metadata));
        document.push("\\end{center}");

        // Draw a horizontal line between renderers (except after last one)
        if (showLine && index < frame.length - 1) {
          document.push("\\noindent\\rule{\\linewidth}{0.3pt}");
        }
      });

      // Only insert \newpage if it's not the last frame
      if (frameIndex < animation.length - 1) {
        document.push("\\newpage");
      }
    });

    // Document footer
    document.push("\\end{document}");

    return document.join("\n");
  }
}
