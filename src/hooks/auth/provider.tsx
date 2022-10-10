import { Page } from '@/types/Page';
import { useCallback, useEffect, useRef, useState } from 'react';

import firebaseConfig from '@/config/firebase-config';

import { ModalRef } from '@/components/Modal';
import AuthModal from '@/modules/hooks/AuthModal';

import { api } from '@/services/api';

import { AuthContext } from './context';
import { User } from './types';

export const AuthProvider: Page = ({ children }) => {
  const authModalRef = useRef<ModalRef>(null);

  const [user, setUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedInitialToken, setHasLoadedInitialToken] = useState(false);

  const auth = useCallback(async (token: string) => {
    setIsLoading(true);

    const res = await api.post<User>(
      '/users',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    setUser(res.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!hasLoadedInitialToken)
      firebaseConfig.auth.onAuthStateChanged(credential => {
        setHasLoadedInitialToken(true);
        setIsLoading(true);

        if (credential) {
          credential.getIdToken().then(token => auth(token));
        }
        setIsLoading(false);
      });
  }, [hasLoadedInitialToken]);

  const signOut = useCallback(async () => {
    setIsLoading(true);

    setUser(undefined);
    await firebaseConfig.auth.signOut();

    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authModalRef,
        user,
        auth,
        signOut,
        loading: { state: isLoading, set: setIsLoading },
      }}
    >
      {children}
      <AuthModal />
    </AuthContext.Provider>
  );
};
