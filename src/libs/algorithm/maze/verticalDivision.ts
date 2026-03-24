import { SPEEDS, WALL_TILE_STYLE } from '@/constants';
import { recursiveDivision } from '@/libs/algorithm/maze/recursiveDivision';
import type { GridType, SpeedType, TileType } from '@/types';
import { getRandInt, isEqual, sleep } from '@/utils';

export const verticalDivision = async ({
  grid,
  startTile,
  endTile,
  row,
  col,
  height,
  width,
  setIsDisabled,
  speed
}: {
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
  row: number;
  col: number;
  height: number;
  width: number;
  setIsDisabled: (disabled: boolean) => void;
  speed: SpeedType;
}) => {
  // Calculate the column position where the vertical wall will be built
  const makeWallAt = col + getRandInt(0, width - 1) * 2 + 1;
  // Choose a random row position for the passage through the wall
  const makePassageAt = row + getRandInt(0, height) * 2;

  for (let i = 0; i < 2 * height - 1; i += 1) {
    // Skip the passage tile to create an opening in the wall
    if (makePassageAt !== row + i) {
      if (
        !isEqual(grid[row + i][makeWallAt], startTile) &&
        !isEqual(grid[row + i][makeWallAt], endTile)
      ) {
        // Mark the tile as a wall
        grid[row + i][makeWallAt].isWall = true;

        // Apply the wall animation style to the DOM element
        document.getElementById(`${row + i}-${makeWallAt}`)!.className =
          `${WALL_TILE_STYLE} animate-wall`;
        await sleep(10 * SPEEDS.find((s) => s.value === speed)!.value - 5);
      }
    }
  }

  // Recursively divide the left section of the wall
  await recursiveDivision({
    grid,
    startTile,
    endTile,
    row,
    col,
    height,
    width: (makeWallAt - col + 1) / 2, // Calculate new width: distance from left to wall, divided by 2 for cell spacing
    setIsDisabled,
    speed
  });

  // Recursively divide the right section of the wall
  await recursiveDivision({
    grid,
    startTile,
    endTile,
    row,
    col: makeWallAt + 1,
    height,
    width: width - (makeWallAt - col + 1) / 2, // Remaining width: total minus the left section
    setIsDisabled,
    speed
  });
};
