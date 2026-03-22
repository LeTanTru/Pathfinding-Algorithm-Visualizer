import type { GridType, TileType } from '@/types';
import { dropFromQueue, getUntraversedNeighbors, isEqual } from '@/utils';

export const dijkstra = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType
) => {
  const traversedTiles: TileType[] = [];
  const base = grid[startTile.row][startTile.col];
  base.distance = 0;
  base.isTraversed = true;
  const untraversedTiles: TileType[] = [base];

  while (untraversedTiles.length > 0) {
    untraversedTiles.sort((a, b) => a.distance - b.distance);

    const currentTile = untraversedTiles.shift();
    if (currentTile) {
      if (currentTile.isWall) continue;
      if (currentTile.distance === Infinity) break;

      currentTile.isTraversed = true;
      traversedTiles.push(currentTile);

      if (isEqual(currentTile, endTile)) break;

      const neighbors = getUntraversedNeighbors(grid, currentTile);

      for (let i = 0; i < neighbors.length; i++) {
        if (currentTile.distance + 1 < neighbors[i].distance) {
          dropFromQueue(neighbors[i], untraversedTiles);
          neighbors[i].distance = currentTile.distance + 1;
          neighbors[i].parent = currentTile;
          untraversedTiles.push(neighbors[i]);
        }
      }
    }
  }

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
