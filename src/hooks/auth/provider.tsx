import { Page } from '@/types/Page';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import firebaseConfig from '@/config/firebase-config';

import AuthModal from '@/modules/hooks/AuthModal';

import { api } from '@/services/api';

import { AuthContext } from './context';
import { AuthModalRef, User } from './types';

export const AuthProvider: Page = ({ children }) => {
  const router = useRouter();
  const authModalRef = useRef<AuthModalRef>(null);

  const [user, setUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const hasLoadedInitialToken = useRef(false);

  const auth = useCallback(async (token: string) => {
    setIsLoading(true);

    (api.defaults.headers as any).authorization = `Bearer ${token}`;

    const res = await api.post<User>('/users');

    setUser(res.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!hasLoadedInitialToken.current)
      firebaseConfig.auth.onAuthStateChanged(async credential => {
        hasLoadedInitialToken.current = true;

        if (credential) {
          await credential.getIdToken().then(token => auth(token));
        }
        if (credential === null) {
          setIsLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        if (error.response.data?.code === 'auth/id-token-expired') {
          router.push('/');
          setUser(undefined);
          authModalRef.current?.open();
        }
        return Promise.reject(error);
      },
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [router]);

  const signOut = useCallback(async () => {
    setIsLoading(true);

    setUser(undefined);
    await firebaseConfig.auth.signOut();

    setIsLoading(false);
  }, []);

  const refreshUser = useCallback(
    async (updateFun: (old: User) => User) => {
      if (!user) return;

      setUser(updateFun(user));
    },
    [user],
  );

  return (
    <AuthContext.Provider
      value={{
        authModalRef,
        user,
        auth,
        signOut,
        refreshUser,
        loading: { state: isLoading, set: setIsLoading },
      }}
    >
      {children}
      <AuthModal />
    </AuthContext.Provider>
  );
};
