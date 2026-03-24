import { SPEEDS, TILE_STYLE } from '@/constants';
import type { GridType, SpeedType } from '@/types';
import { sleep } from '@/utils/helper';

export const destroyWall = async (
  grid: GridType,
  row: number,
  col: number,
  isRight: number,
  speed: SpeedType
) => {
  // Destroy wall to the right
  if (isRight && grid[row][col + 1]) {
    grid[row][col + 1].isWall = false;
    document.getElementById(`${row}-${col + 1}`)!.className = TILE_STYLE;
    await sleep(20 * SPEEDS.find((s) => s.value === speed)!.value - 5);
  }
  // Destroy wall to the bottom
  else if (grid[row + 1]) {
    grid[row + 1][col].isWall = false;
    document.getElementById(`${row + 1}-${col}`)!.className = TILE_STYLE;
    await sleep(20 * SPEEDS.find((s) => s.value === speed)!.value - 5);
  }
  // Destroy wall in the main diagonal
  else {
    grid[row][col].isWall = false;
    document.getElementById(`${row}-${col}`)!.className = TILE_STYLE;
    await sleep(20 * SPEEDS.find((s) => s.value === speed)!.value - 5);
  }
};
