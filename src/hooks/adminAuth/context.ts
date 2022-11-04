import { createContext } from 'react';

import { AdminAuthContextData } from './types';

const AdminAuthContext = createContext<AdminAuthContextData>(
  {} as AdminAuthContextData,
);

export { AdminAuthContext };
