// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps} from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBqv4NBgru2JIfMhIH7on_t7OiO-fB6LDY",
  authDomain: "prepbot-12dfe.firebaseapp.com",
  projectId: "prepbot-12dfe",
  storageBucket: "prepbot-12dfe.firebasestorage.app",
  messagingSenderId: "499894869116",
  appId: "1:499894869116:web:cb1a6f1650e7da7f0bfdf9",
  measurementId: "G-Y33N91QXML"
};

// Initialize Firebase
const app =!getApps.length ?  initializeApp(firebaseConfig) :getApp();

export const auth = getAuth(app);
export const db = getFirestore(app)