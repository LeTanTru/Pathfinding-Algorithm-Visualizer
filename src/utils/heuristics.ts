import { MAX_COLS, MAX_ROWS } from '@/constants';
import type { GridType, TileType } from '@/types';

const retrieveHeuristicsCost = (currentTile: TileType, endTile: TileType) => {
  const mahattanDistance = 1;
  const row = Math.abs(currentTile.row - endTile.row);
  const col = Math.abs(currentTile.col - endTile.col);
  return mahattanDistance * (row + col);
};

export const initHeuristics = (grid: GridType, endTile: TileType) => {
  const heuristicsCost = [];
  for (let i = 0; i < MAX_ROWS; i++) {
    const row = [];
    for (let j = 0; j < MAX_COLS; j++) {
      const cost = retrieveHeuristicsCost(grid[i][j], endTile);
      row.push(cost);
    }
    heuristicsCost.push(row);
  }
  return heuristicsCost;
};

export const initFunctionCost = () => {
  const functionCost = [];

  for (let i = 0; i < MAX_ROWS; i++) {
    const row = [];
    for (let j = 0; j < MAX_COLS; j++) {
      row.push(Infinity);
    }
    functionCost.push(row);
  }

  return functionCost;
};
