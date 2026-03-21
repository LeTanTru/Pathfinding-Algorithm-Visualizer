import type { TileType } from '@/types';
import { isEqual } from '@/utils/helper';

export const isInQueue = (tile: TileType, queue: TileType[]) => {
  return queue.some((t) => isEqual(tile, t));
};
