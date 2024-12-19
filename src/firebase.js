// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBrk6dXsqxkLwJTLp-OJ-L_jKhuhXDEI3s",
  authDomain: "clone-6b397.firebaseapp.com",
  projectId: "clone-6b397",
  storageBucket: "clone-6b397.firebasestorage.app",
  messagingSenderId: "617725099111",
  appId: "1:617725099111:web:90695f5fae1113f80128c2",
  measurementId: "G-5TCQLLKDHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth();
export const db=getFirestore(app);
export const provider=new GoogleAuthProvider();