import { defineConfig } from "tsup";

export default defineConfig({
    outDir: "../../../dist/@algorithm-visualizer/typescript-latex-renderer",
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
});