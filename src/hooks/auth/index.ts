import { useContext } from 'react';

import { AuthContextData } from './types';
import { AuthContext } from './context';

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthContext');
  }

  return context;
};

export { useAuth };
