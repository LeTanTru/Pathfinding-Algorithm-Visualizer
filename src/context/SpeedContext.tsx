import type { SpeedType } from '@/types';
import { createContext, useState } from 'react';

type SpeedContextType = {
  speed: SpeedType;
  setSpeed: (speed: SpeedType) => void;
};

export const SpeedContext = createContext<SpeedContextType | undefined>(
  undefined
);

export const SpeedProvider = ({ children }: { children: React.ReactNode }) => {
  const [speed, setSpeed] = useState<SpeedType>(0.5);
  return (
    <SpeedContext.Provider
      value={{
        speed,
        setSpeed
      }}
    >
      {children}
    </SpeedContext.Provider>
  );
};
