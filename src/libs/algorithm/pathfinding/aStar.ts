import type { GridType, TileType } from '@/types';
import {
  dropFromQueue,
  getUntraversedNeighbors,
  initFunctionCost,
  initHeuristics,
  isEqual
} from '@/utils';

export const aStar = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType
) => {
  const traversedTiles: TileType[] = [];
  const heuristicsCost = initHeuristics(grid, endTile);
  const functionCost = initFunctionCost();

  const base = grid[startTile.row][startTile.col];
  base.distance = 0;
  functionCost[base.row][base.col] =
    base.distance + heuristicsCost[base.row][base.col];
  base.isTraversed = true;

  const untraversedTiles: TileType[] = [base];

  while (untraversedTiles.length > 0) {
    untraversedTiles.sort((a, b) => {
      if (functionCost[a.row][a.col] === functionCost[b.row][b.col]) {
        return b.distance - a.distance;
      }
      return functionCost[a.row][a.col] - functionCost[b.row][b.col];
    });

    const currentTile = untraversedTiles.shift();
    if (currentTile) {
      if (currentTile.isWall) continue;
      if (currentTile.distance === Infinity) break;
      currentTile.isTraversed = true;
      traversedTiles.push(currentTile);

      if (isEqual(currentTile, endTile)) break;

      const neighbors = getUntraversedNeighbors(grid, currentTile);

      for (let i = 0; i < neighbors.length; i++) {
        const distanceToNeighbor = currentTile.distance + 1;
        if (distanceToNeighbor < neighbors[i].distance) {
          dropFromQueue(neighbors[i], untraversedTiles);
          neighbors[i].distance = distanceToNeighbor;
          functionCost[neighbors[i].row][neighbors[i].col] =
            neighbors[i].distance +
            heuristicsCost[neighbors[i].row][neighbors[i].col];
          neighbors[i].parent = currentTile;
          untraversedTiles.push(neighbors[i]);
        }
      }
    }
  }

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
