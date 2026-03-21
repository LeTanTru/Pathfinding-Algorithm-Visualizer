import type { GridType, TileType } from '@/types';
import { getUntraversedNeighbors, isEqual } from '@/utils';
import { isInQueue } from '@/utils/isInQueue';

export const bfs = (grid: GridType, startTile: TileType, endTile: TileType) => {
  const traversedTiles: TileType[] = [];
  const base = grid[startTile.row][startTile.col];

  base.distance = 0;
  base.isTraversed = true;

  const untraversed = [base];

  while (untraversed.length) {
    const tile = untraversed.shift();

    if (tile) {
      if (tile.isWall) continue;

      if (tile.distance === Infinity) break;

      tile.isTraversed = true;

      traversedTiles.push(tile);

      if (isEqual(tile, endTile)) break;

      const neighbors = getUntraversedNeighbors(grid, tile);

      for (let i = 0; i < neighbors.length; i++) {
        if (!isInQueue(neighbors[i], untraversed)) {
          neighbors[i].distance = tile.distance + 1;
          neighbors[i].parent = tile;
          untraversed.push(neighbors[i]);
        }
      }
    }
  }

  const path: TileType[] = [];
  let tile: TileType | null = grid[endTile.row][endTile.col];

  while (tile) {
    tile.isPath = true;
    path.unshift(tile);
    tile = tile.parent;
  }

  return { traversedTiles, path };
};
