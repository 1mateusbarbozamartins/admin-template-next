import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onIdTokenChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const useFirebase = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true';

let app = null;
let auth = null;

if (useFirebase) {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  };

  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
}

export { auth, signInWithPopup, GoogleAuthProvider, onIdTokenChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword };
