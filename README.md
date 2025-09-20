# Algorithm Visualization Framework

Algorithm Visualizer is a framework for **recording, framing, and rendering algorithms**.  
It allows algorithm executions to be captured, transformed into frame-based animations, and rendered either as **LaTeX/TikZ (PDF)** or as **interactive web components (Angular)**.

The framework is structured into three main layers:
1. **Recorder** → Logs algorithm operations and events.
2. **Framer** → Converts recorded events into sequential frames.
3. **Renderer** → Renders frames as visual or interactive outputs.

---

## 📂 Repository Structure

```text
root
├── dist/                         # Built versions of all modules (ready-to-use libraries)
├── docs/                         # Project documentation
│   ├── contracts/                # Recording & Animation contracts
│   └── ...                       # General project documentation
├── examples/                     # Example usage projects
│   ├── latex-examples/           # Example project using LaTeX renderer
│   └── web-examples/             # Example project using Angular web renderer
└── modules/                      # Source code of the framework
    ├── recorder/                 # Recorder layer implementation
    │   └── typescript-recorder/  # TypeScript recorder (implements recording contract)
    ├── framer/                   # Framer layer implementation
    │   └── typescript-framer/    # TypeScript framer (recording → animation contract)
    └── renderer/                 # Renderer layer implementation
        ├── typescript-angular-renderer/ # Angular web renderer
        └── typescript-latex-renderer/   # LaTeX/TikZ renderer
```


---

## 📦 Modules

### Recorder
Captures algorithm events (array operations, graph updates, logs, etc.) in a standardized format.

- [Typescript Recorder](./modules/recorder/typescript-recorder/README.md)

### Framer
Converts recorded events into a sequence of complete frames that describe the algorithm execution step by step.

- [Typescript Framer](./modules/framer/typescript-framer/README.md)

### Renderer
Converts framer animation output into a complete render for each frame.

- [Typescript Angular Renderer](./modules/renderer/typescript-angular-renderer/README.md)
- [Typescript Latex Renderer](./modules/renderer/typescript-latex-renderer/README.md)

Each implemented module contains its own `README.md` with details and usage instructions.

---

## 📑 Documentation

All documentation is in the [`docs/`](./docs) folder:
- **Contracts**:
    - [Recording Contract](./docs/contracts/recording.contract.md)
    - [Animation Contract](./docs/contracts/animation.contract.md)
  

- **Project Overview**: Full documentation of the framework.

---

## 🚀 Examples

Example projects are in the [`examples/`](./examples) folder:
- [Latex Examples](./examples/latex-examples/README.md)
- [Web Examples](./examples/web-examples/README.md)

---

## 📦 Distribution

The [`dist/`](./dist) folder contains the **built versions of all modules** for direct usage:
- Typescript Recorder
- Typescript Framer
- Typescript Angular Renderer
- Typescript LaTeX Renderer

---

## 📌 Development Strategy

- Keep this README **short and high-level**.
- Each module, example, and contract has its own **dedicated README.md** for details.
- This way, contributors and users can navigate easily without one huge README file.  
