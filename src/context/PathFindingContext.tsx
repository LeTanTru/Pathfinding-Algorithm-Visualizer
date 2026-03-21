import { END_TILE_CONFIG, START_TILE_CONFIG } from '@/constants';
import type { AlgorithmType, GridType, MazeType } from '@/types';
import { createGrid } from '@/utils';
import { createContext, useState } from 'react';

type PathFindingContextType = {
  algorithm: AlgorithmType;
  maze: MazeType;
  grid: GridType;
  isGraphVisualized: boolean;

  setAlgorithm: (algorithm: AlgorithmType) => void;
  setMaze: (maze: MazeType) => void;
  setGrid: (grid: GridType) => void;
  setIsGraphVisualized: (isGraphVisualized: boolean) => void;
};

export const PathFindingContext = createContext<
  PathFindingContextType | undefined
>(undefined);

export const PathFindingProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('BFS');
  const [maze, setMaze] = useState<MazeType>('NONE');
  const [grid, setGrid] = useState<GridType>(
    createGrid(START_TILE_CONFIG, END_TILE_CONFIG)
  );
  const [isGraphVisualized, setIsGraphVisualized] = useState<boolean>(false);

  return (
    <PathFindingContext.Provider
      value={{
        algorithm,
        maze,
        grid,
        isGraphVisualized,
        setAlgorithm,
        setMaze,
        setGrid,
        setIsGraphVisualized
      }}
    >
      {children}
    </PathFindingContext.Provider>
  );
};
