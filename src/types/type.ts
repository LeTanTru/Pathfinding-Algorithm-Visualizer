export type AlgorithmType = 'DFS' | 'BFS' | 'DIJKSTRA' | 'A_STAR';

export type AlgorithmOptionType = {
  name: string;
  value: AlgorithmType;
};

export type MazeType = 'NONE' | 'BINARY_TREE' | 'RECURSIVE_DIVISION';

export type MazeOptionType = {
  name: string;
  value: MazeType;
};

export type TileType = {
  row: number;
  col: number;
  isEnd: boolean;
  isWall: boolean;
  isPath: boolean;
  distance: number;
  isStart: boolean;
  isTraversed: boolean;
  parent: TileType | null;
};

export type GridType = TileType[][];

export type SpeedType = 2 | 1 | 0.5;

export type SpeedOptionType = {
  name: string;
  value: SpeedType;
};
