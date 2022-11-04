import { Page } from '@/types/Page';

import { useCallback, useState } from 'react';

import { adminApi } from '@/services/api';

import { AdminAuthContext } from './context';
import { AuthFormData } from './types';

export const AdminAuthProvider: Page = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(false);

  const auth = useCallback(async ({ email, password }: AuthFormData) => {
    adminApi.defaults.auth = { username: email, password };

    await adminApi.post('/admin');

    setIsAuthed(true);
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        auth,
        isAuthed,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
