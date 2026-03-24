import { SPEEDS, WALL_TILE_STYLE } from '@/constants';
import { recursiveDivision } from '@/libs/algorithm/maze/recursiveDivision';
import type { GridType, SpeedType, TileType } from '@/types';
import { getRandInt, isEqual, sleep } from '@/utils';

export const horizontalDivision = async ({
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
  // Calculate the row position where the horizontal wall will be built
  const makeWallAt = row + getRandInt(0, height - 1) * 2 + 1;
  // Choose a random column position for the passage through the wall
  const makePassageAt = col + getRandInt(0, width) * 2;

  for (let i = 0; i < 2 * width - 1; i += 1) {
    // Skip the passage tile to create an opening in the wall
    if (makePassageAt !== col + i) {
      if (
        !isEqual(grid[makeWallAt][col + i], startTile) &&
        !isEqual(grid[makeWallAt][col + i], endTile)
      ) {
        // Mark the tile as a wall
        grid[makeWallAt][col + i].isWall = true;

        // Apply the wall animation style to the DOM element
        document.getElementById(`${makeWallAt}-${col + i}`)!.className =
          `${WALL_TILE_STYLE} animate-wall`;
        await sleep(10 * SPEEDS.find((s) => s.value === speed)!.value - 5);
      }
    }
  }

  // Recursively divide the upper section above the wall
  await recursiveDivision({
    grid,
    startTile,
    endTile,
    row,
    col,
    height: (makeWallAt - row + 1) / 2, // Calculate new height: distance from top to wall, divided by 2 for cell spacing
    width,
    setIsDisabled,
    speed
  });

  // Recursively divide the lower section below the wall
  await recursiveDivision({
    grid,
    startTile,
    endTile,
    row: makeWallAt + 1,
    col,
    height: height - (makeWallAt - row + 1) / 2, // Remaining height: total minus the upper section
    width,
    setIsDisabled,
    speed
  });
};
