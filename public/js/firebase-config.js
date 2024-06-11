// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEvffBRwvCiZ6QE2f_Igew24OOh63VeuU",
  authDomain: "capstone-8f342.firebaseapp.com",
  projectId: "capstone-8f342",
  storageBucket: "capstone-8f342.appspot.com",
  messagingSenderId: "1021313757185",
  appId: "1:1021313757185:web:7dd2f39b1366066e7e1000",
  measurementId: "G-644FPT73MQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
