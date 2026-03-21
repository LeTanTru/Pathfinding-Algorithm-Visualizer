import Tile from '@/components/Tile';
import { MAX_COLS, MAX_ROWS } from '@/constants';
import { usePathFinding } from '@/hooks';
import { checkIfStartOrEnd, createNewGrid } from '@/utils';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const Grid = ({
  isVisualizeRunningRef
}: {
  isVisualizeRunningRef: React.RefObject<boolean>;
}) => {
  const { grid, setGrid } = usePathFinding();

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const handleMouseDown = (row: number, col: number) => {
    if (isVisualizeRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }

    setIsMouseDown(true);
    const newGrid = createNewGrid(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = (row: number, col: number) => {
    if (isVisualizeRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }

    setIsMouseDown(false);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isVisualizeRunningRef.current || checkIfStartOrEnd(row, col)) {
      return;
    }

    if (isMouseDown) {
      const newGrid = createNewGrid(grid, row, col);
      setGrid(newGrid);
    }
  };

  return (
    <div
      className={twMerge(
        'mt-10 flex flex-col items-center justify-center border-sky-300',
        `lg:min-h-[${MAX_ROWS * 17}px] md:min-h-[${MAX_ROWS * 15}px] xs:min-h-[${MAX_ROWS * 8}px] min-h-[${MAX_ROWS * 7}px]`,
        `lg:w-[${MAX_COLS * 17}px] md:w-[${MAX_COLS * 15}px] xs:w-[${MAX_COLS * 8}px] min-w-[${MAX_COLS * 7}px]`
      )}
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className='flex'>
          {row.map((tile, colIndex) => {
            return (
              <Tile
                key={colIndex}
                {...tile}
                handleMouseDown={handleMouseDown}
                handleMouseUp={handleMouseUp}
                handleMouseEnter={handleMouseEnter}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
