import { horizontalDivision } from '@/libs/algorithm/maze/horizontalDivision';
import { verticalDivision } from '@/libs/algorithm/maze/verticalDivision';
import type { GridType, SpeedType, TileType } from '@/types';

export const recursiveDivision = async ({
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
  setIsDisabled: (isDisabled: boolean) => void;
  speed: SpeedType;
}) => {
  if (height <= 1 || width <= 1) return;

  if (height > width) {
    await horizontalDivision({
      grid,
      startTile,
      endTile,
      row,
      col,
      height,
      width,
      setIsDisabled,
      speed
    });
  } else {
    await verticalDivision({
      grid,
      startTile,
      endTile,
      row,
      col,
      height,
      width,
      setIsDisabled,
      speed
    });
  }
};
