import { initializeApp } from "firebase/app";
import { getFirestore,collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPkbmW-2e_I0xdjfQrbkr4ZD0z21X_LNk",
  authDomain: "delices-de-kevinne.firebaseapp.com",
  projectId: "delices-de-kevinne",
  storageBucket: "delices-de-kevinne.appspot.com",
  messagingSenderId: "954770510711",
  appId: "1:954770510711:web:8dff16d06281503a4b4772",
  measurementId: "G-CG942BE9YL",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
 const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,collection, getDocs, addDoc, doc, updateDoc, deleteDoc };