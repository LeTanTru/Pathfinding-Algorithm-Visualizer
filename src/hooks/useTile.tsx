import { TileContext } from '@/context';
import { useContext } from 'react';

const useTile = () => {
  const context = useContext(TileContext);

  if (!context) {
    throw new Error('useTile must be used within TileProvider');
  }

  return context;
};

export default useTile;
