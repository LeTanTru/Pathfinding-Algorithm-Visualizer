import { END_TILE_CONFIG, START_TILE_CONFIG } from '@/constants';
import type { TileType } from '@/types';
import { createContext, useState } from 'react';

type TileContextType = {
  startTile: TileType;
  endTile: TileType;
  setStartTile: (startTile: TileType) => void;
  setEndTile: (endTile: TileType) => void;
};

export const TileContext = createContext<TileContextType | undefined>(
  undefined
);

export const TileProvider = ({ children }: { children: React.ReactNode }) => {
  const [startTile, setStartTile] = useState<TileType>(START_TILE_CONFIG);
  const [endTile, setEndTile] = useState<TileType>(END_TILE_CONFIG);
  return (
    <TileContext.Provider
      value={{
        startTile,
        endTile,
        setStartTile,
        setEndTile
      }}
    >
      {children}
    </TileContext.Provider>
  );
};
