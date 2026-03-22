import { aStar, bfs, dfs, dijkstra } from '@/libs/algorithm/pathfinding';
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
      return dfs(grid, startTile, endTile);
    case 'BFS':
      return bfs(grid, startTile, endTile);
    case 'DIJKSTRA':
      return dijkstra(grid, startTile, endTile);
    case 'A_STAR':
      return aStar(grid, startTile, endTile);
    default:
      break;
  }
};
