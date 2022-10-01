import { Page } from '@/types/Page';
import { useEffect, useState } from 'react';

import firebaseConfig from '@/config/firebase-config';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import TodoList from '@/modules/TodoList';

const Test: Page = () => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [token, setToken] = useState('');

  useEffect(() => {
    firebaseConfig.auth.onAuthStateChanged(credential => {
      setIsLoading(false);
      setIsAuthed(!!credential);

      if (credential) {
        credential.getIdToken().then(_token => {
          setToken(_token);
        });
      }
    });
  }, []);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(
        firebaseConfig.auth,
        firebaseConfig.provider,
      );

      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (credential) setIsAuthed(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8">
      {!isLoading && !isAuthed && (
        <>
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <button
            type="button"
            className="px-4 py-2 bg-black text-white"
            onClick={loginWithGoogle}
          >
            Login with Google
          </button>
        </>
      )}

      {!isLoading && isAuthed && <TodoList token={token} />}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Test;
