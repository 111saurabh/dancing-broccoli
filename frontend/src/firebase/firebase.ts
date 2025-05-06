import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

type AuthUser = ReturnType<typeof getAuth>['currentUser'];

const firebaseConfig = {
  apiKey: "AIzaSyDR5_jzcXn2qfrxswSDBfvqwCgz031VK_A",
  authDomain: "skillswap-5ef31.firebaseapp.com",
  projectId: "skillswap-5ef31",
  storageBucket: "skillswap-5ef31.firebasestorage.app",
  messagingSenderId: "854843543903",
  appId: "1:854843543903:web:84fed4c8669fe7a4cbe6ea",
  measurementId: "G-S814MB7B8C"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

export type { AuthUser };