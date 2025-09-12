# Algorithm Visualization Framework

This project is a framework for **recording, framing, and rendering algorithms**.  
It allows algorithm executions to be captured, transformed into frame-based animations, and rendered either as **LaTeX/TikZ (PDF)** or as **interactive web components (Angular)**.

The framework is structured into three main layers:
1. **Recorder** → Logs algorithm operations and events.
2. **Framer** → Converts recorded events into sequential frames.
3. **Renderer** → Renders frames as visual or interactive outputs.

---

## 📂 Repository Structure  


---

## 📦 Modules

### Recorder  
Captures algorithm events (array operations, graph updates, logs, etc.) in a standardized format.

- [Typescript Recorder](./)

### Framer
Converts recorded events into a sequence of complete frames that describe the algorithm execution step by step.

- [Recording Contract](./docs/contracts/recording.contract.md)

### Renderer
Converts framer animation output into a complete render for each frame.

- [Recording Contract](./docs/contracts/recording.contract.md)
- [Recording Contract](./docs/contracts/recording.contract.md)

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
- **Latex Examples** → Demonstrates PDF/TikZ rendering.
- **Web Examples** → Demonstrates interactive Angular rendering.

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
