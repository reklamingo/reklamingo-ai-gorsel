// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHivUWOL46kzRemkk_wCtmOBWM-RENjS0",
  authDomain: "reklamingo-fff15.firebaseapp.com",
  projectId: "reklamingo-fff15",
  storageBucket: "reklamingo-fff15.firebasestorage.app",
  messagingSenderId: "805598631225",
  appId: "1:805598631225:web:2851d621e9a8567ad044e8",
  measurementId: "G-Z6YZ8YZ9DV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);