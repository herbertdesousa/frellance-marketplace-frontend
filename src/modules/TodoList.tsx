import { Page } from '@/types/Page';
import { MdAdd, MdLogout } from 'react-icons/md';

import firebaseConfig from '@/config/firebase-config';
import { useEffect } from 'react';
import axios from 'axios';

const TodoList: Page<{ token: string }> = ({ token }) => {
  // useEffect(() => {
  //   (async () => {
  //     if (!token) return;

  //     const res = await axios.get('http://localhost:3333/todos', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //   })();
  // }, [token]);

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Todos</h1>
      <ul>
        <li>item 1</li>
        <li>item 2</li>
        <button
          type="button"
          className="px-4 py-2 bg-black text-white text-xs mt-2 flex"
          // onClick={loginWithGoogle}
        >
          <MdAdd size={16} className="mr-2" />
          Adicionar
        </button>

        <button
          type="button"
          className="px-4 py-2 bg-white border border-black text-black font-medium text-xs mt-8 flex"
          onClick={() => firebaseConfig.auth.signOut()}
        >
          <MdLogout size={16} className="mr-2" />
          Sair
        </button>
      </ul>
    </>
  );
};

export default TodoList;
