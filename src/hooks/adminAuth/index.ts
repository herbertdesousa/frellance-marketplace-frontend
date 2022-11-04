import { useContext } from 'react';

import { AdminAuthContextData } from './types';
import { AdminAuthContext } from './context';

const useAdminAuth = (): AdminAuthContextData => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthContext');
  }

  return context;
};

export { useAdminAuth };
