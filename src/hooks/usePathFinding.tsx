import { PathFindingContext } from '@/context';
import { useContext } from 'react';

const usePathFinding = () => {
  const context = useContext(PathFindingContext);

  if (!context) {
    throw new Error('usePathFinding must be used within PathFindingProvider');
  }

  return context;
};

export default usePathFinding;
