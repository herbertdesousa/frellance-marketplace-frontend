import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const app = initializeApp({
  apiKey: 'AIzaSyCv8EAbkiszJH6DWl8g05c_rWnI8uPjKCw',
  authDomain: 'test-auth-41451.firebaseapp.com',
  projectId: 'test-auth-41451',
  storageBucket: 'test-auth-41451.appspot.com',
  messagingSenderId: '204571217114',
  appId: '1:204571217114:web:0a91565d3a6dafae05e9e3',
});

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export default { auth, provider };
