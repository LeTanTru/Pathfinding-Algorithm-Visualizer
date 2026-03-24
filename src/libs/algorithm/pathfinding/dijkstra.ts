import type { GridType, TileType } from '@/types';
import { dropFromQueue, getUntraversedNeighbors, isEqual } from '@/utils';

// Dijkstra's algorithm - finds the shortest path using a priority queue approach
// Works on weighted graphs by always exploring the tile with the smallest distance first
export const dijkstra = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType
) => {
  const traversedTiles: TileType[] = [];
  const base = grid[startTile.row][startTile.col];
  // Initialize the starting tile with distance 0
  base.distance = 0;
  base.isTraversed = true;
  // Priority queue (simulated with sorted array) for Dijkstra's algorithm
  const untraversedTiles: TileType[] = [base];

  while (untraversedTiles.length > 0) {
    // Sort by distance to simulate priority queue - process closest tile first
    untraversedTiles.sort((a, b) => a.distance - b.distance);

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

      // Update distances to neighbors if a shorter path is found
      for (let i = 0; i < neighbors.length; i++) {
        if (currentTile.distance + 1 < neighbors[i].distance) {
          // Remove neighbor from queue if already present
          dropFromQueue(neighbors[i], untraversedTiles);
          neighbors[i].distance = currentTile.distance + 1;
          neighbors[i].parent = currentTile;
          untraversedTiles.push(neighbors[i]);
        }
      }
    }
  }

  // Backtrack from end to start using parent references to reconstruct the path
  const path: TileType[] = [];
  let current = grid[endTile.row][endTile.col];

  while (current) {
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
