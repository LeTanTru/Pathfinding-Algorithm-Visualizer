import PlayButton from '@/components/PlayButton';
import Select from '@/components/Select';
import {
  ALGORITHMS,
  EXTENDED_SLEEP_TIME,
  MAZES,
  SLEEP_TIME,
  SPEEDS
} from '@/constants';
import { usePathFinding, useSpeed, useTile } from '@/hooks';
import type { AlgorithmType, MazeType, SpeedType } from '@/types';
import {
  animatePath,
  resetGrid,
  runMazeAlgorithm,
  runPathfindingAlgorithm
} from '@/utils';
import { useState } from 'react';

const Nav = ({
  isVisualizeRunningRef
}: {
  isVisualizeRunningRef: React.RefObject<boolean>;
}) => {
  const {
    grid,
    maze,
    algorithm,
    isGraphVisualized,
    setGrid,
    setMaze,
    setAlgorithm,
    setIsGraphVisualized
  } = usePathFinding();
  const { startTile, endTile } = useTile();
  const { speed, setSpeed } = useSpeed();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleGenerateMaze = (maze: MazeType) => {
    if (maze === 'NONE') {
      setMaze(maze);
      resetGrid({ grid, startTile, endTile });
      return;
    }

    setMaze(maze);
    setIsDisabled(true);

    runMazeAlgorithm({
      maze,
      grid,
      startTile,
      endTile,
      setIsDisabled,
      speed
    });

    const newGrid = grid.slice();
    setGrid(newGrid);
    setIsGraphVisualized(false);
  };

  const handleRunVisualizer = () => {
    if (isGraphVisualized) {
      setIsGraphVisualized(false);
      resetGrid({ grid: grid.slice(), startTile, endTile });
      return;
    }

    const result = runPathfindingAlgorithm({
      algorithm,
      grid,
      startTile,
      endTile
    });

    if (result) {
      const { traversedTiles, path } = result;
      animatePath(traversedTiles, path, startTile, endTile, speed);
      setIsDisabled(true);
      isVisualizeRunningRef.current = true;
      setTimeout(
        () => {
          const newGrid = grid.slice();
          setGrid(newGrid);
          setIsGraphVisualized(true);
          setIsDisabled(false);
          isVisualizeRunningRef.current = false;
        },
        SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2) +
          EXTENDED_SLEEP_TIME *
            (path.length + 60) *
            SPEEDS.find((s) => s.value === speed)!.value
      );
    }
  };

  return (
    <div className='flex min-h-18 items-center justify-center border-b border-b-white px-0 shadow-gray-600 sm:px-5'>
      <div className='flex w-full items-center justify-center text-white sm:w-208 lg:justify-between'>
        <h1 className='hidden w-[40%] pl-1 text-2xl lg:flex'>
          Pathfinding Visualizer
        </h1>
        <div className='flex flex-col items-center justify-start space-y-3 py-4 sm:flex-row sm:items-end sm:justify-between sm:space-y-0 sm:space-x-4 sm:py-0'>
          <Select
            label='Maze Algorithm'
            value={maze}
            options={MAZES}
            onChange={(e) => {
              handleGenerateMaze(e.target.value as MazeType);
            }}
            isDisabled={isDisabled}
          />
          <Select
            label='Graph'
            value={algorithm}
            options={ALGORITHMS}
            onChange={(e) => {
              setAlgorithm(e.target.value as AlgorithmType);
            }}
            isDisabled={isDisabled}
          />
          <Select
            label='Speed'
            value={speed}
            options={SPEEDS}
            onChange={(e) => {
              setSpeed(Number(e.target.value) as SpeedType);
            }}
            isDisabled={isDisabled}
          />
          <PlayButton
            isDisabled={isDisabled}
            handleRunVisualizer={handleRunVisualizer}
            isGraphVisualizer={isGraphVisualized}
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
