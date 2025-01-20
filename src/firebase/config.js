import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onIdTokenChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithPopup, GoogleAuthProvider, onIdTokenChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword };
