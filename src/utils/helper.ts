import {
  END_TILE_CONFIG,
  MAX_COLS,
  MAX_ROWS,
  START_TILE_CONFIG
} from '@/constants';
import type { GridType, TileType } from '@/types';

const createRow = (row: number, startTile: TileType, endTile: TileType) => {
  const currentRow: TileType[] = [];

  for (let col = 0; col < MAX_COLS; col++) {
    currentRow.push({
      row,
      col,
      isEnd: row === endTile.row && col === endTile.col,
      isWall: false,
      isPath: false,
      distance: Infinity,
      isStart: row === startTile.row && col === startTile.col,
      parent: null,
      isTraversed: false
    });
  }

  return currentRow;
};

export const createGrid = (startTile: TileType, endTile: TileType) => {
  const grid: GridType = [];
  for (let row = 0; row < MAX_ROWS; row++) {
    grid.push(createRow(row, startTile, endTile));
  }
  return grid;
};

export const checkIfStartOrEnd = (row: number, col: number) => {
  return (
    (row === START_TILE_CONFIG.row && col === START_TILE_CONFIG.col) ||
    (row === END_TILE_CONFIG.row && col === END_TILE_CONFIG.col)
  );
};

export const createNewGrid = (grid: GridType, row: number, col: number) => {
  const newGrid = grid.slice();
  const newTile = {
    ...newGrid[row][col],
    isWall: !newGrid[row][col].isWall
  };

  newGrid[row][col] = newTile;
  return newGrid;
};

export const isEqual = (a: TileType, b: TileType) => {
  return a.row === b.row && a.col === b.col;
};

export const isRowColEqual = (row: number, col: number, tile: TileType) => {
  return row === tile.row && col === tile.col;
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getRandInt = (min: number, max: number) => {
  const _min = Math.ceil(min);
  const _max = Math.floor(max);
  return Math.floor(Math.random() * (_max - _min)) + _min;
};
