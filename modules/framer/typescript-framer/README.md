# @algorithm-visualizer/typescript-framer

`@algorithm-visualizer/typescript-framer` is a TypeScript package that converts algorithm recordings into frame-by-frame animations. It is compatible with the **Recording Contract** and produces output according to the **Animation Contract**.

Each type of recorder (Array2D, Chart, Graph, Log) has a corresponding framer implementation, but their internal methods are abstracted. The main purpose of this package is to provide an **animation** from a given **recording**.

## Features

- Compatible with Array2D, Chart, Graph, and Log recordings.
- Converts recordings into structured animations.
- Provides frame states for each framer type.
- Uses `tsup` to build the package.
- Output build location is the default (`dist` folder).

---

## Installation

```bash
npm install @algorithm-visualizer/typescript-framer
```

keep in mind in order to be able to install this module from npm you need to first publish the built library on npm.

---

## Usage

```ts
import { FramerEngine } from '@algorithm-visualizer/typescript-framer';
import { Recording } from './models/recorder/recording.type';

const framer = new FramerEngine();
const recording: Recording = getRecordingSomehow();

const animation = framer.getAnimation(recording);
// animation is an array of frames for rendering
```

---

# Framer Types

### Array2DFramer
- Handles Array2D recordings.
- Maintains state for cells, rows, and highlights.
- Produces `Array2dState` as frame state.

### ChartFramer
- Handles chart recordings.
- Supports operations on chart bars and highlights.
- Produces `ChartState` as frame state.

### GraphFramer
- Handles graph recordings.
- Supports nodes, edges, and highlighting operations.
- Produces `GraphState` as frame state.

### LogFramer
- Handles log recordings.
- Supports setting and clearing messages.
- Produces `LogState` as frame state.

---

# Build

In order to build this module first we need to install its dependencies, so first be sure you are at the root of the module and then run the following commands:

```bash
npm i
```

This package uses `tsup` for building:

```bash
npm run build
```

The build will generate outputs into:

```ts
dist/@algorithm-visualizer/typescript-framer/
```


---

# Contracts

- **Recording Contract**: The framer expects recordings following the recording contract.
- **Animation Contract**: The output is a sequence of frames that follow the animation contract.

---

# Types Overview

- **Animation**: `Frame[]`
- **Frame**: `FrameState[]`
- **FrameState**: `{ id: string; type: string; state: T }`
- **Array2dState**, **ChartState**, **GraphState**, **LogState**: specific states for each framer type.
