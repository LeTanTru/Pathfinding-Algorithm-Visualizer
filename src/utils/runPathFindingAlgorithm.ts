import { bfs } from '@/libs/algorithm/pathfinding';
import type { AlgorithmType, GridType, TileType } from '@/types';

export const runPathfindingAlgorithm = ({
  algorithm,
  grid,
  startTile,
  endTile
}: {
  algorithm: AlgorithmType;
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
}) => {
  switch (algorithm) {
    case 'DFS':
      break;
    case 'BFS':
      return bfs(grid, startTile, endTile);
    case 'DIJKSTRA':
      break;
    case 'A_STAR':
      break;
    default:
      break;
  }
};
