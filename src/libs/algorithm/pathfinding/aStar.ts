import type { GridType, TileType } from '@/types';
import {
  dropFromQueue,
  getUntraversedNeighbors,
  initFunctionCost,
  initHeuristics,
  isEqual
} from '@/utils';

// A* pathfinding algorithm - combines Dijkstra's approach with heuristics
// Uses f(n) = g(n) + h(n) where g is the cost from start and h is the heuristic estimate to goal
// Guarantees the shortest path when the heuristic is admissible (never overestimates)
export const aStar = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType
) => {
  const traversedTiles: TileType[] = [];
  // Precompute heuristic costs (Manhattan distance) from each tile to the end
  const heuristicsCost = initHeuristics(grid, endTile);
  // Function cost array stores f(n) = g(n) + h(n) for each tile
  const functionCost = initFunctionCost();

  const base = grid[startTile.row][startTile.col];
  // Initialize the starting tile
  base.distance = 0;
  // f(start) = g(start) + h(start) = 0 + heuristic cost
  functionCost[base.row][base.col] =
    base.distance + heuristicsCost[base.row][base.col];
  base.isTraversed = true;

  // Priority queue (simulated with sorted array) for A* algorithm
  const untraversedTiles: TileType[] = [base];

  while (untraversedTiles.length > 0) {
    // Sort by f(n) = g(n) + h(n) to process the most promising tile first
    // Tie-breaker: prefer tiles with higher g(n) to explore paths closer to the goal
    untraversedTiles.sort((a, b) => {
      if (functionCost[a.row][a.col] === functionCost[b.row][b.col]) {
        return b.distance - a.distance;
      }
      return functionCost[a.row][a.col] - functionCost[b.row][b.col];
    });

    const currentTile = untraversedTiles.shift();
    if (currentTile) {
      // Skip walls - they cannot be traversed
      if (currentTile.isWall) continue;
      // Stop if distance is infinite (unreachable)
      if (currentTile.distance === Infinity) break;
      // Mark tile as traversed and add to result
      currentTile.isTraversed = true;
      traversedTiles.push(currentTile);

      // Exit early if we've reached the end tile
      if (isEqual(currentTile, endTile)) break;

      const neighbors = getUntraversedNeighbors(grid, currentTile);

      // Update neighbors if a shorter path is found
      for (let i = 0; i < neighbors.length; i++) {
        const distanceToNeighbor = currentTile.distance + 1;
        if (distanceToNeighbor < neighbors[i].distance) {
          // Remove neighbor from queue if already present
          dropFromQueue(neighbors[i], untraversedTiles);
          neighbors[i].distance = distanceToNeighbor;
          // Update f(n) = g(n) + h(n) for the neighbor
          functionCost[neighbors[i].row][neighbors[i].col] =
            neighbors[i].distance +
            heuristicsCost[neighbors[i].row][neighbors[i].col];
          neighbors[i].parent = currentTile;
          untraversedTiles.push(neighbors[i]);
        }
      }
    }
  }

  // Backtrack from end to start using parent references to reconstruct the path
  const path: TileType[] = [];
  let current = grid[endTile.row][endTile.col];
  while (current !== null) {
    current.isPath = true;
    path.unshift(current);
    if (current.parent) {
      current = current.parent;
    } else {
      break;
    }
  }
  return { traversedTiles, path };
};
