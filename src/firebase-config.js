// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaPxMiSra7k6RIvFu_Utv7OHWsOtmgrrk",
  authDomain: "okiki-bookish.firebaseapp.com",
  projectId: "okiki-bookish",
  storageBucket: "okiki-bookish.firebasestorage.app",
  messagingSenderId: "489741311680",
  appId: "1:489741311680:web:9efbd7d5840f5364159725"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);