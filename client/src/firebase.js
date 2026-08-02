// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "abs-developers.firebaseapp.com",
  projectId: "abs-developers",
  storageBucket: "abs-developers.firebasestorage.app",
  messagingSenderId: "875019843351",
  appId: "1:875019843351:web:80212f3d7cedfdb9822952"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);