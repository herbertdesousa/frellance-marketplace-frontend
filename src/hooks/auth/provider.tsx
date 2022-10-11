import { Page } from '@/types/Page';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import firebaseConfig from '@/config/firebase-config';

import { ModalRef } from '@/components/Modal';
import AuthModal from '@/modules/hooks/AuthModal';

import { api } from '@/services/api';

import { AuthContext } from './context';
import { User } from './types';

export const AuthProvider: Page = ({ children }) => {
  const router = useRouter();
  const authModalRef = useRef<ModalRef>(null);

  const [user, setUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedInitialToken, setHasLoadedInitialToken] = useState(false);

  const auth = useCallback(async (token: string) => {
    setIsLoading(true);

    (api.defaults.headers as any).authorization = `Bearer ${token}`;

    const res = await api.post<User>('/users');

    setUser(res.data);
    setIsLoading(false);
  }, []);

  // (
  //   api.defaults.headers as any
  // ).authorization = `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk5NjJmMDRmZWVkOTU0NWNlMjEzNGFiNTRjZWVmNTgxYWYyNGJhZmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiaGVyYmVydCBzb3VzYSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BTG01d3UwZUxkMDNHQ0VmandYZDZubWpRQzM4OFVzVUs4Q19sNkZaRW5xZ2d3PXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2ZyZWxsYW5jZS1tYXJrZXRwbGFjZSIsImF1ZCI6ImZyZWxsYW5jZS1tYXJrZXRwbGFjZSIsImF1dGhfdGltZSI6MTY2NTQyNzQ4OCwidXNlcl9pZCI6InAzRlJzbzlMMzFNRDNGczhFNEV1VllUOXZlajIiLCJzdWIiOiJwM0ZSc285TDMxTUQzRnM4RTRFdVZZVDl2ZWoyIiwiaWF0IjoxNjY1NDk4Mzg4LCJleHAiOjE2NjU1MDE5ODgsImVtYWlsIjoic291c2FoZXJiZXJ0MTM4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA4Nzc5ODQzMjM4OTEwNDMwMzk0Il0sImVtYWlsIjpbInNvdXNhaGVyYmVydDEzOEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.TGe3laSh2IhZmy6NiHcWBq9t0bdFTT7nDGiwn2rZDjb1wL8ET9ZAXBXnUe2P0TiFgfj8qoM3zfLqa51-OmoJOJ-BcNptcg0FPbmu4MFaILFHwpfDrq3kYLQAWQDjaOyQX93Kh4rz9FUH_tegNg2H6UqTp9tHJuJpsKQBMsdrw3fNgZn5266Am43HpXLE0ensRS_jg_ueHbad01EtI-oKsIAeZGKMsx4bSzu9b2OoRmbq863ESDEN8q6591Ylboxv6589YYSu5mBkwMf-IhAEmNseY_gVsj2VsnjXNGiim3PjQJuDpYpVH2uqocatfPUNFxq2YJ1hnQLgsnSDEdfuzQ`;

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

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        if (error.response.data?.code === 'auth/id-token-expired') {
          console.log('asdasd');
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
