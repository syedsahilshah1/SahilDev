import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2LtfA4fdHhXlC_I77zBhRQ9kfQvKu3OY",
  authDomain: "sahilclient-fef70.firebaseapp.com",
  projectId: "sahilclient-fef70",
  storageBucket: "sahilclient-fef70.firebasestorage.app",
  messagingSenderId: "873534932354",
  appId: "1:873534932354:web:1949d2277e18eaf2297b9b",
  measurementId: "G-W1LWYY1VGC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
