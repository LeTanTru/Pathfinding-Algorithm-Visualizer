import type { GridType, TileType } from '@/types';
import { checkStack, getUntraversedNeighbors, isEqual } from '@/utils';

// Depth-First Search (DFS) pathfinding algorithm
// Explores as far as possible along each branch before backtracking
// Does not guarantee the shortest path
export const dfs = (grid: GridType, startTile: TileType, endTile: TileType) => {
  const traversedTiles: TileType[] = [];
  const base = grid[startTile.row][startTile.col];
  // Initialize the starting tile
  base.distance = 0;
  base.isTraversed = true;
  // Stack for DFS: stores tiles to be explored (LIFO order)
  const untraversedTiles = [base];

  while (untraversedTiles.length > 0) {
    const currentTile = untraversedTiles.pop();
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

      // Get all adjacent tiles that haven't been traversed yet
      const neighbors = getUntraversedNeighbors(grid, currentTile);
      // Add unvisited neighbors to the stack
      for (let i = 0; i < neighbors.length; i++) {
        if (!checkStack(neighbors[i], untraversedTiles)) {
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
