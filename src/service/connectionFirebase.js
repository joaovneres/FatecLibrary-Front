// biblioteca do firebase
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
// autenticação de email e senha
import 'firebase/compat/auth';
// trabalha com o banco de dados cirado no firebase
import 'firebase/compat/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDUKr5rc-P0n6jcP38hXX3IifkXvDYkbcU',
  authDomain: 'dbfateclibrary-13c29.firebaseapp.com',
  projectId: 'dbfateclibrary-13c29',
  storageBucket: 'dbfateclibrary-13c29.appspot.com',
  messagingSenderId: '786229904215',
  appId: '1:786229904215:web:78bdf1fe29414db0183412',
};

if (!firebase.apps.lenght) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

const provider = new GoogleAuthProvider();

export { firebase, provider };
