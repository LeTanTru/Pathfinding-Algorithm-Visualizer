import { MAX_COLS, MAX_ROWS } from '@/constants';
import type { GridType, SpeedType, TileType } from '@/types';
import { createWall, destroyWall, getRandInt, isEqual, sleep } from '@/utils';

export const binaryTree = async (
  grid: GridType,
  startTile: TileType,
  endTile: TileType,
  setIsDisabled: (isDisabled: boolean) => void,
  speed: SpeedType
) => {
  createWall(startTile, endTile, speed);
  await sleep(MAX_ROWS * MAX_COLS);

  // Create wall based on grid
  for (const row of grid) {
    for (const tile of row) {
      // If row or col is even
      if (tile.row % 2 === 0 || tile.col % 2 === 0) {
        // If not start or end tile
        if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
          // Create wall
          tile.isWall = true;
        }
      }
    }
  }

  // Destroy wall to create path
  for (let row = 1; row < MAX_ROWS; row += 2) {
    for (let col = 1; col < MAX_COLS; col += 2) {
      // Skip end tile
      if (isEqual(grid[row][col], endTile)) {
        continue;
      }
      // If last row
      else if (row === MAX_ROWS - 2) {
        // Destroy wall to the right in row MAX_ROWS - 2
        await destroyWall(grid, row, col, 1, speed);
      }
      // If last col
      else if (col === MAX_COLS - 2) {
        // Destroy wall to the bottom in col MAX_COLS-2
        await destroyWall(grid, row, col, 0, speed);
      }
      // Destroy wall randomly
      else {
        await destroyWall(grid, row, col, getRandInt(0, 2), speed);
      }
    }
  }

  setIsDisabled(false);
};
