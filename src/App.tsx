import { Grid, Nav } from '@/components';
import { PathFindingProvider, SpeedProvider, TileProvider } from '@/context';
import { useRef } from 'react';

const App = () => {
  const isVisualizeRunningRef = useRef<boolean>(false);

  return (
    <PathFindingProvider>
      <TileProvider>
        <SpeedProvider>
          <div className='flex h-screen w-screen flex-col'>
            <Nav isVisualizeRunningRef={isVisualizeRunningRef} />
            <Grid isVisualizeRunningRef={isVisualizeRunningRef} />
          </div>
        </SpeedProvider>
      </TileProvider>
    </PathFindingProvider>
  );
};

export default App;
