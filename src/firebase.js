// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV095Hym7II7f-4sz6MSEK4yNW6o-4uHY",
  authDomain: "crud-project-17db8.firebaseapp.com",
  projectId: "crud-project-17db8",
  storageBucket: "crud-project-17db8.firebasestorage.app",
  messagingSenderId: "249922784286",
  appId: "1:249922784286:web:ad796e5fa2320e5ee9320f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);