import { MAX_COLS, MAX_ROWS, SPEEDS } from '@/constants';
import { binaryTree, recursiveDivision } from '@/libs/algorithm/maze';
import type { GridType, MazeType, SpeedType, TileType } from '@/types';
import { constructBorder } from '@/utils';

export const runMazeAlgorithm = async ({
  maze,
  grid,
  startTile,
  endTile,
  setIsDisabled,
  speed
}: {
  maze: MazeType;
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
  setIsDisabled: (isDisabled: boolean) => void;
  speed: SpeedType;
}) => {
  if (maze === 'BINARY_TREE') {
    await binaryTree(grid, startTile, endTile, setIsDisabled, speed);
  } else if (maze === 'RECURSIVE_DIVISION') {
    const currentSpeed = SPEEDS.find((s) => s.value === speed)?.value ?? 2;

    // Build the outer border of the grid
    await constructBorder(grid, startTile, endTile);

    // Start the recursive division algorithm to generate the maze
    await recursiveDivision({
      grid,
      startTile,
      endTile,
      row: 1,
      col: 1,
      height: Math.floor((MAX_ROWS - 1) / 2), // Use half the grid size to work with the inner area (excluding borders)
      width: Math.floor((MAX_COLS - 1) / 2), // Use half the grid size to work with the inner area (excluding borders)
      setIsDisabled,
      speed
    });

    setTimeout(() => {
      setIsDisabled(false);
    }, 800 * currentSpeed);
  }
};
