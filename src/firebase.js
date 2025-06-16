// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
 apiKey: "AIzaSyAgfhe9yqpZ6dpEJH1MkfjzDpFhbxJ06JA",
  authDomain: "brt-check.firebaseapp.com",
  projectId: "brt-check",
  storageBucket: "brt-check.firebasestorage.app",
  messagingSenderId: "625185637039",
  appId: "1:625185637039:web:08edbc3583816f15290a5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Auth instance
export const auth = getAuth(app);
