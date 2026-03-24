import type { GridType, TileType } from '@/types';
import { getUntraversedNeighbors, isEqual } from '@/utils';
import { isInQueue } from '@/utils/isInQueue';

// Breadth-First Search (BFS) pathfinding algorithm
// Explores level by level, guaranteeing the shortest path on unweighted grids
export const bfs = (grid: GridType, startTile: TileType, endTile: TileType) => {
  const traversedTiles: TileType[] = [];
  const base = grid[startTile.row][startTile.col];

  // Initialize the starting tile with distance 0
  base.distance = 0;
  base.isTraversed = true;

  // Queue for BFS: stores tiles to be explored
  const untraversed = [base];

  while (untraversed.length) {
    const tile = untraversed.shift();

    if (tile) {
      // Skip walls - they cannot be traversed
      if (tile.isWall) continue;

      // Stop if distance is infinite (unreachable)
      if (tile.distance === Infinity) break;

      // Mark tile as traversed and add to result
      tile.isTraversed = true;

      traversedTiles.push(tile);

      // Exit early if we've reached the end tile
      if (isEqual(tile, endTile)) break;

      // Get all adjacent tiles that haven't been traversed yet
      const neighbors = getUntraversedNeighbors(grid, tile);

      // Add unvisited neighbors to the queue with updated distance and parent
      for (let i = 0; i < neighbors.length; i++) {
        if (!isInQueue(neighbors[i], untraversed)) {
          neighbors[i].distance = tile.distance + 1;
          neighbors[i].parent = tile;
          untraversed.push(neighbors[i]);
        }
      }
    }
  }

  // Backtrack from end to start using parent references to reconstruct the path
  const path: TileType[] = [];
  let tile: TileType | null = grid[endTile.row][endTile.col];

  while (tile) {
    tile.isPath = true;
    path.unshift(tile);
    tile = tile.parent;
  }

  return { traversedTiles, path };
};
