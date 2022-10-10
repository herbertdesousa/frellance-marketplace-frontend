import { Page } from '@/types/Page';
import { useEffect, useState } from 'react';

import firebaseConfig from '@/config/firebase-config';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import TodoList from '@/modules/TodoList';
import axios from 'axios';

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
          registerUserInBackend(_token);
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

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const loginWithCredential = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        firebaseConfig.auth,
        credentials.email,
        credentials.password,
      );

      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (credential) setIsAuthed(true);
    } catch (err) {
      console.log(err);
    }
  };

  const registerUserInBackend = async (_token: string) => {
    setToken(_token);

    const res = await axios.post(
      'http://localhost:3333/users',
      {},
      {
        headers: { Authorization: `Bearer ${_token}` },
      },
    );
  };

  return (
    <div className="p-8">
      {!isLoading && !isAuthed && (
        <>
          <h1 className="text-2xl font-semibold mb-4">Login</h1>

          <div className="flex flex-col items-start mb-8">
            <label htmlFor="email">
              Email:
              <input
                id="email"
                type="email"
                placeholder="type your email..."
                className="ml-2"
                onChange={e => {
                  setCredentials(st => ({ ...st, email: e.target.value }));
                }}
              />
            </label>
            <label htmlFor="password" className="mt-1">
              Password:
              <input
                id="password"
                type="password"
                placeholder="type your password..."
                className="ml-2"
                onChange={e => {
                  setCredentials(st => ({ ...st, password: e.target.value }));
                }}
              />
            </label>
            <button
              type="button"
              className="px-4 py-2 bg-black text-white mt-2"
              onClick={loginWithCredential}
            >
              Submit
            </button>
          </div>

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
