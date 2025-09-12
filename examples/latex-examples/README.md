# LaTeX Example Projects

This folder contains 6 example TypeScript files demonstrating different algorithms using the framework with:

- TypeScript Recorder
- TypeScript Framer
- TypeScript LaTeX Renderer

Each example generates a `.tex` file and a `.pdf` file using `pdflatex`.

---

## Prerequisites

- Node.js and npm installed
- LaTeX installed (`pdflatex` command available globally)

---

## Installation

```bash
npm i
```

---

## Running an Example

1. Navigate to the `src` folder:

```bash
cd src
```

2. Run the example using `ts-node`:

```bash
npx ts-node name-of-file.ts
```

Example:

```bash
npx ts-node a-star.ts
```

---

## Output

- Output files are saved in the `src/output` folder.
- Each example has its own subfolder with the same name as the file, for example:

```text
src/output/a-star/
├─ a-star.tex
└─ a-star.pdf
```

Repeat for any other example file in the `src` folder.
