import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const app = initializeApp({
  apiKey: 'AIzaSyDuRNmus5-ubIs3IfQQV-t9ieAcyMDMu0E',
  authDomain: 'frellance-marketplace.firebaseapp.com',
  projectId: 'frellance-marketplace',
  storageBucket: 'frellance-marketplace.appspot.com',
  messagingSenderId: '220025258693',
  appId: '1:220025258693:web:6f29c39ce5d1db23fb26ac',
  measurementId: 'G-XHB68WMBCY',
});

const auth = getAuth(app);
const storage = getStorage(app);

const provider = new GoogleAuthProvider();

export default { auth, provider, storage };
