// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxRBxMeYCsTLhBtKbPaGFnTW4Fj1OpUfA",
  authDomain: "service-desk-app-8af9b.firebaseapp.com",
  projectId: "service-desk-app-8af9b",
  storageBucket: "service-desk-app-8af9b.firebasestorage.app",
  messagingSenderId: "14837737907",
  appId: "1:14837737907:web:48eaaa02c8dba2b92ac3c6",
  measurementId: "G-W1DL48X886"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);