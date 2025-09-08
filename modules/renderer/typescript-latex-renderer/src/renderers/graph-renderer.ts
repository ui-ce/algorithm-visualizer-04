import { IRenderer } from '../models/renderer/i-renderer.interface';
import { GraphState } from '../models/framer/graph/graph-state.type';
import { GraphMetaData } from '../models/renderer/graph/graph-metadata.type';

export class GraphRenderer implements IRenderer {
  public render(state: GraphState, metadata?: GraphMetaData): string {
    const lines: string[] = [];
    const nodeCount = state.nodes.length;
    const radius = 3; // cm

    // Configuration
    const minHeight = metadata?.minHeight ?? 3; // cm
    const alignName = metadata?.alignName ?? 'center'; // left | center | right

    // LaTeX flush mapping
    const flushMap: Record<string, string> = {
      center: 'center',
      left: 'flushleft',
      right: 'flushright',
    };

    // Display graph name with alignment
    lines.push(`\\begin{${flushMap[alignName]}}\\textbf{${state.name}}\\\\[2mm]\\end{${flushMap[alignName]}}`);

    // Reserve minHeight space
    lines.push("\\begin{tikzpicture}");
    lines.push(`  \\filldraw[fill=white!0, draw=none] (-${radius + 1}cm,0) rectangle (${radius + 1}cm, -${minHeight}cm);`);

    if (nodeCount === 0) {
      lines.push("\\end{tikzpicture}");
      return lines.join("\n");
    }

    // Build mappings of highlightTag → color
    const nodeTagColors: Record<string, string> = {};
    metadata?.nodeHighlightTags?.forEach(tag => {
      nodeTagColors[tag.tag] = tag.color;
    });

    const edgeTagColors: Record<string, string> = {};
    metadata?.edgeHighlightTags?.forEach(tag => {
      edgeTagColors[tag.tag] = tag.color;
    });

    const defaultNodeColor = metadata?.defaultNodeColor ?? 'white';
    const defaultEdgeColor = metadata?.defaultEdgeColor ?? 'black';

    // Draw nodes
    state.nodes.forEach((node, i) => {
      const angle = (360 * i / nodeCount).toFixed(1);

      const highlightTag = node.highlightTags[node.highlightTags.length - 1];
      const fillColor = highlightTag ? nodeTagColors[highlightTag] ?? defaultNodeColor : defaultNodeColor;

      const label = node.label ? node.label.replace(/([_%&])/g, '\\$1') : '';

      lines.push(`  \\node[circle, draw, minimum size=8mm, fill=${fillColor}] (${node.id}) at (${angle}:${radius}cm) {${label}};`);
    });

    // Draw edges
    state.edges.forEach(edge => {
      const highlightTag = edge.highlightTags[edge.highlightTags.length - 1];
      const drawColor = highlightTag ? edgeTagColors[highlightTag] ?? defaultEdgeColor : defaultEdgeColor;

      const edgeOptions = `${drawColor}, line width=1.2pt`;

      if (edge.label) {
        const safeEdgeLabel = edge.label.replace(/([_%&])/g, '\\$1');
        lines.push(`  \\draw[${edgeOptions}] (${edge.source}) -- node[midway, sloped, above] {${safeEdgeLabel}} (${edge.target});`);
      } else {
        lines.push(`  \\draw[${edgeOptions}] (${edge.source}) -- (${edge.target});`);
      }
    });

    lines.push("\\end{tikzpicture}");
    return lines.join("\n");
  }
}
