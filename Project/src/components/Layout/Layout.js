// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);