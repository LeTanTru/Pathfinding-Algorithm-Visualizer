import type { MouseEventHandler } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { GrPowerReset } from 'react-icons/gr';

const PlayButton = ({
  handleRunVisualizer,
  isDisabled,
  isGraphVisualizer
}: {
  handleRunVisualizer: MouseEventHandler<HTMLButtonElement>;
  isDisabled: boolean;
  isGraphVisualizer: boolean;
}) => {
  return (
    <button
      onClick={handleRunVisualizer}
      disabled={isDisabled}
      className='focus:ring-opacity-30 shrink-0 rounded-full border-none bg-green-500 p-2.5 shadow-md transition-all duration-200 ease-linear hover:bg-green-600 focus:ring focus:ring-green-300 focus:outline-none active:ring-green-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-500'
    >
      {isGraphVisualizer ? (
        <GrPowerReset className='size-5' />
      ) : (
        <BsFillPlayFill className='size-5' />
      )}
    </button>
  );
};

export default PlayButton;
