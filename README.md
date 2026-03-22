# Pathfinding Algorithm Visualization

An interactive React + TypeScript app for visualizing graph pathfinding and maze generation algorithms on a grid.

## What this project does

This visualizer lets you:

- Draw walls directly on the grid with mouse drag.
- Generate mazes using:
  - Binary Tree
  - Recursive Division
- Run and animate pathfinding algorithms:
  - Depth-First Search (DFS)
  - Breadth-First Search (BFS)
  - Dijkstra
  - A\* Search
- Control animation speed (`Slow`, `Medium`, `Fast`).
- Reset/re-run visualizations from the same UI.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in your terminal (typically `http://localhost:5173`).

## Available scripts

```bash
npm run dev       # Start development server
npm run build     # Type-check and build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
npm run format    # Run Prettier
```

## Project structure (high level)

- `src/components` - UI controls and grid rendering.
- `src/libs/algorithm/pathfinding` - Pathfinding algorithm implementations.
- `src/libs/algorithm/maze` - Maze generation implementations.
- `src/utils` - Animation helpers, grid helpers, and algorithm runners.
- `src/context` + `src/hooks` - Shared state for grid, speed, and selected algorithms.

## Notes

- Grid size is currently configured to `39 x 49` tiles.
- Start and end tiles are fixed by default and excluded from wall generation.
